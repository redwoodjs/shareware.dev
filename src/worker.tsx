import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render, prefix, index, layout } from "rwsdk/router";
import { Document } from "@/app/Document";
import { HomePage } from "@/app/pages/HomePage";
import { setCommonHeaders } from "@/app/headers";
import { authRoutes } from "@/app/pages/auth/routes";
import { sessions, setupSessionStore } from "./session/store";
import { Session } from "./session/durableObject";
import { db, setupDb } from "@/db";
import { env } from "cloudflare:workers";
import { LegalPage } from "./app/pages/LegalPage";
import { AddonPage } from "./app/pages/AddonPage";
import { DocsPage } from "./app/pages/DocsPage";
import { SubmitPage } from "./app/pages/SubmitPage";
import { adminRoutes } from "./app/pages/admin/routes";
import { Prisma } from "@generated/prisma";
import { link } from "./app/shared/links";
import { InteriorLayout } from "./app/layouts/InteriorLayout";

export { SessionDurableObject } from "./session/durableObject";

export type UserWithRole = Prisma.UserGetPayload<{
  include: {
    role: true;
  };
}>;

export type AppContext = {
  session: Session | null;
  user: UserWithRole | null;
};

const isAuthenticated = async ({ ctx }: { ctx: AppContext }) => {
  if (!ctx.user) {
    return new Response(null, {
      status: 302,
      headers: { Location: link("/login") },
    });
  }
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    await setupDb(env);
    setupSessionStore(env);

    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
        include: {
          role: true,
        },
      });
    }
  },
  render(Document, [
    index(HomePage),
    layout(InteriorLayout, [
      route("/addon/:slug", AddonPage),
      route("/docs", DocsPage),
      route("/submit", [SubmitPage]),
      route("/legal/:slug", LegalPage),
      route("/docs/:slug", DocsPage),
    ]),
    ...authRoutes,
    route("/storage/*", [
      async ({ params }) => {
        // 1. Attempts to fetch object from R2 bucket using the path parameter
        const object = await env.R2.get("/storage/" + params.$0);
        // 2. If object doesn't exist, return 404
        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }
        // 3. If found, return the object with proper content type
        return new Response(object.body, {
          headers: {
            "Content-Type": object.httpMetadata?.contentType as string,
          },
        });
      },
    ]),
    prefix("/admin", [isAuthenticated, adminRoutes]),
  ]),
]);

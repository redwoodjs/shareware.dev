import { layout, route } from "rwsdk/router";
import { LoginPage } from "./LoginPage";
import { sessions } from "@/session/store";
import { SignupPage } from "./SignupPage";
import { ForgotPage } from "./ForgotPage";
import { ResetPage } from "./ResetPage";
import AuthLayout from "@/app/layouts/AuthLayout";
import { db } from "@/db";

const gotoLogin = () => {
  return new Response(null, {
    status: 302,
    headers: { Location: "/login" },
  });
};

export const authRoutes = [
  layout(AuthLayout, [
    route("/login", [LoginPage]),
    route("/signup", [SignupPage]),
    route("/forgot", [ForgotPage]),
    route("/reset", [ResetPage]),
    route("/logout", async function ({ request }) {
      const headers = new Headers();
      await sessions.remove(request, headers);
      headers.set("Location", "/");

      return new Response(null, {
        status: 302,
        headers,
      });
    }),
    route("/verify", async ({ request }) => {
      const url = new URL(request.url);
      const token = url.searchParams.get("token");

      // if no token, redirect to login
      if (!token) {
        return gotoLogin();
      }

      // verify the token
      const user = await db.user.findUnique({
        select: {
          id: true,
          tokenExpiresAt: true,
        },
        where: {
          token: token,
        },
      });

      // if the user is not found, redirect to login
      if (!user) {
        return gotoLogin();
      }

      // if the token has expired, redirect to login
      if (!user.tokenExpiresAt || user.tokenExpiresAt < new Date()) {
        return gotoLogin();
      }

      // verify the user
      await db.user.update({
        where: { id: user.id },
        data: {
          verified: true,
          token: null,
          tokenExpiresAt: null,
        },
      });

      // redirect to login
      return gotoLogin();
    }),
  ]),
];

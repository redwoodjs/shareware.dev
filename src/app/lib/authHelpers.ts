import { AppContext } from "@/worker";

export const isAuthenticated = ({ ctx }: { ctx: AppContext }) => {
  if (!ctx.user || !ctx.user.verified) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" },
    });
  }
};

export const isAdmin = ({ ctx }: { ctx: AppContext }) => {
  if (!ctx.user || !ctx.user.verified || ctx.user.role.name !== "admin") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" },
    });
  }
};

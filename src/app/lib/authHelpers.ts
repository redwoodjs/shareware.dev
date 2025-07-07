import { AppContext } from "@/worker";
import bcrypt from "bcryptjs";

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

export const getHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password as string, salt);
  return hashedPassword;
};

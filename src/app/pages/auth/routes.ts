import { route } from "rwsdk/router";
import { LoginPage } from "./LoginPage";
import { sessions } from "@/session/store";
import { SignupPage } from "./SignupPage";
import { ForgotPage } from "./ForgotPage";
import { ResetPage } from "./ResetPage";

export const authRoutes = [
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
];

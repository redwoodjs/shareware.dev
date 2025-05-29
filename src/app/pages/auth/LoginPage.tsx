"use client";

import { link } from "@/app/shared/links";
import AuthLayout from "../../layouts/AuthLayout";
import { handleLogin } from "./actions";
import { toast } from "sonner";

const LoginPage = () => {
  const handleSubmit = async (formData: FormData) => {
    const result = await handleLogin(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      window.location.href = link("/");
    }
  };

  return (
    <AuthLayout>
      <>
        <form className="auth-box" action={handleSubmit}>
          <h1>Login</h1>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              tabIndex={1}
              autoFocus
              required
              autoComplete="email"
            />
          </div>
          <div className="field">
            <div className="flex items-center justify-between">
              <label htmlFor="password">Password</label>
              <a
                href={link("/forgot")}
                className="text-sm text-link underline font-bold hover:text-link-hover"
              >
                Forgot?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              tabIndex={2}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="button-group justify-end up">
            <a href={link("/")} className="button">
              Cancel
            </a>
            <button type="submit" className="button primary">
              Submit
            </button>
          </div>
        </form>
        <div className="text-center w-full pt-5">
          <a
            href={link("/signup")}
            className="font-bold text-link underline hover:text-link-hover text-sm"
          >
            Need an account?
          </a>
        </div>
      </>
    </AuthLayout>
  );
};

export { LoginPage };

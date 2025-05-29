import { link } from "@/app/shared/links";
import AuthLayout from "../../layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <>
        <div className="auth-box">
          <h1>Login</h1>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
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
            <input type="password" id="password" />
          </div>
          <div className="button-group justify-end up">
            <a href={link("/")} className="button">
              Cancel
            </a>
            <button type="submit" className="button primary">
              Submit
            </button>
          </div>
        </div>
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

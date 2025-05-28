import { link } from "@/app/shared/links";
import AuthLayout from "../../layouts/AuthLayout";

const ForgotPage = () => {
  return (
    <AuthLayout>
      <>
        <div className="auth-box">
          <h1>Forgot your Password?</h1>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="button-group justify-end">
            <a href={link("/login")} className="button">
              Cancel
            </a>
            <button type="submit" className="button primary">
              Submit
            </button>
          </div>
        </div>
        <div className="text-center w-full pt-5">
          <a
            href={link("/login")}
            className="font-bold text-link underline hover:text-link-hover text-sm"
          >
            Ready to Login?
          </a>
        </div>
      </>
    </AuthLayout>
  );
};

export { ForgotPage };

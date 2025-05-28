import { link } from "@/app/shared/links";
import AuthLayout from "../../layouts/AuthLayout";

const ResetPage = () => {
  return (
    <AuthLayout>
      <>
        <div className="auth-box">
          <h1>Reset your Password</h1>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" />
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

export { ResetPage };

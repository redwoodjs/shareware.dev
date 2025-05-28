import AuthLayout from "@/app/layouts/AuthLayout";
import { link } from "@/app/shared/links";

const SignupPage = () => {
  return (
    <AuthLayout>
      <>
        <div className="auth-box">
          <h1>Signup</h1>
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
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
            Ready to login?
          </a>
        </div>
      </>
    </AuthLayout>
  );
};

export { SignupPage };

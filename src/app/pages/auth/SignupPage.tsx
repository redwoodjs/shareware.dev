"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import { link } from "@/app/shared/links";
import { handleRegister } from "./actions";
import { toast } from "sonner";

const SignupPage = () => {
  const handleSignup = async (formData: FormData) => {
    const result = await handleRegister(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      window.location.href = link("/login");
    }
  };

  return (
    <AuthLayout>
      <>
        <form className="auth-box" action={handleSignup}>
          <h1>Signup</h1>
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
          </div>
          <div className="button-group justify-end up">
            <a href={link("/login")} className="button">
              Cancel
            </a>
            <button type="submit" className="button primary">
              Submit
            </button>
          </div>
        </form>
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

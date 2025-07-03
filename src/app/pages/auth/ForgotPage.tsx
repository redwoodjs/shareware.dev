"use client";

import { link } from "@/app/shared/links";
import { handleForgotPassword } from "./actions";
import { toast } from "sonner";

const ForgotPage = () => {
  const handleSubmit = async (formData: FormData) => {
    const result = await handleForgotPassword(formData);
    if (result.error) {
      console.error(result.error);
    } else {
      toast.success("Password reset email sent.");
    }
  };

  return (
    <>
      <form action={handleSubmit} className="auth-box">
        <h1>Forgot your Password?</h1>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
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
          Ready to Login?
        </a>
      </div>
    </>
  );
};

export { ForgotPage };

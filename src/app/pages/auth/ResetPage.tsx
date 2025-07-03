import { link } from "@/app/shared/links";
import { handleResetPassword } from "./actions";
import { toast } from "sonner";

const ResetPage = () => {
  const handleSubmit = async (formData: FormData) => {
    const result = await handleResetPassword(formData);
    if (result.error) {
      console.error(result.error);
    } else {
      toast.success("Password reset successfully.");
      window.location.href = link("/login");
    }
  };

  return (
    <form action={handleSubmit}>
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
        <div className="button-group justify-end up">
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
    </form>
  );
};

export { ResetPage };

"use client";

import { toast } from "sonner";
import { newSubscriber } from "../pages/actions";
import { Window } from "./Window";

export const Newsletter = () => {
  const handleSubmit = async (formData: FormData) => {
    const result = await newSubscriber(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("You're subscribed!");
    }
  };
  return (
    <Window title="Don't Build it Twice">
      <form
        action={handleSubmit}
        className="grid grid-cols-[3fr_1fr] gap-x-[100px] newsletter px-10 py-4"
      >
        <div className="col-span-2 flex gap-x-4 pb-12">
          <img
            src="/images/info-icon.png"
            alt="Info Icon"
            srcSet="/images/info-icon@2x.png 2x, /images/info-icon.png 1x"
          />
          <p className="font-chicago">
            Get notified when we launch new add ons and receive exclusive early
            access opportunities.
          </p>
        </div>
        <div>
          <div className="field">
            <label htmlFor="name">First Name</label>
            <input type="text" id="name" name="firstName" />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
        </div>
        <div>
          <button type="submit" className="newsletter-button primary w-[140px]">
            <span>Subscribe</span>
          </button>
          <br />
          <button
            type="reset"
            role="button"
            className="newsletter-button w-[140px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </Window>
  );
};

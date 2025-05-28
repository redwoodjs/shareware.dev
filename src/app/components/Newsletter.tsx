"use client";

import { Window } from "./Window";

export const Newsletter = () => {
  return (
    <Window title="Don't Build it Twice">
      <div className="grid grid-cols-[3fr_1fr] gap-x-[100px] newsletter px-10 py-4">
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
            <input type="text" id="name" />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
        </div>
        <div>
          <button className="newsletter-button primary w-[140px]">
            <span>Subscribe</span>
          </button>
          <br />
          <button className="newsletter-button w-[140px]">Cancel</button>
        </div>
      </div>
    </Window>
  );
};

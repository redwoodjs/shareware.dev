"use client";

import { Overlay } from "@/app/components/Overlay";
import { RadioButtonButton } from "@/app/components/RadioButtonButton";
import { Sheet } from "@/app/components/Sheet";
import { Toggle } from "@/app/components/Toggle";
import { link } from "@/app/shared/links";
import { useEscapeKey } from "captain-react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NewAddOnButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEscapeKey(() => {
    setIsSheetOpen(false);
  });

  return (
    <>
      <button className="button primary" onClick={() => setIsSheetOpen(true)}>
        New
      </button>
      <AnimatePresence>
        {isSheetOpen && (
          <>
            <Overlay />
            <motion.div
              initial={{ x: "100%", y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: "100%", y: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-[var(--z-index-window)]"
            >
              <Sheet handleClose={() => setIsSheetOpen(false)}>
                <h2 className="subheading mb-8">New Add On</h2>
                <form>
                  <div className="button-group mb-8">
                    <RadioButtonButton
                      name="status"
                      value="pending"
                      label="Pending"
                      icon="clock"
                      className="normal-case flex-1"
                      defaultChecked
                    />
                    <RadioButtonButton
                      name="status"
                      value="archive"
                      label="Archive"
                      icon="archive"
                      className="normal-case flex-1"
                    />
                    <RadioButtonButton
                      name="status"
                      value="approved"
                      label="Approved"
                      icon="check"
                      className="normal-case flex-1"
                    />
                  </div>
                  <div className="field">
                    <Toggle
                      name="featured"
                      value="featured"
                      defaultChecked={false}
                      label="Featured on the homepage?"
                    />
                  </div>
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
                    <label htmlFor="githubRepo">GitHub Repository URL</label>
                    <input type="text" id="githubRepo" />
                  </div>
                  <div className="field">
                    <label htmlFor="addonName">Add on Package Name</label>
                    <input type="text" id="addonName" />
                  </div>
                  <div className="field">
                    <label htmlFor="demoUrl">URL of Demo</label>
                    <input type="url" id="demoUrl" />
                  </div>
                  <div className="field">
                    <label htmlFor="briefDescription">Brief Description</label>
                    <textarea id="briefDescription" />
                  </div>
                  <div className="field">
                    <label htmlFor="category">Category</label>
                    <select id="category">
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div className="field flex items-start gap-2 accept-terms mb-10">
                    <div>
                      <input type="checkbox" id="terms" />
                    </div>
                    <p className="relative leading-normal">
                      I've read and accept RedwoodSDK's{" "}
                      <a href={link("/legal/:slug", { slug: "guidelines" })}>
                        Add-On Guidelines
                      </a>{" "}
                      and{" "}
                      <a href={link("/legal/:slug", { slug: "guidelines" })}>
                        Community Guidelines.
                      </a>
                    </p>
                  </div>
                  <div className="button-group justify-start up">
                    <button type="submit" className="button primary">
                      Submit
                    </button>
                    <button type="button" className="button">
                      Cancel
                    </button>
                  </div>
                </form>
              </Sheet>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export { NewAddOnButton };

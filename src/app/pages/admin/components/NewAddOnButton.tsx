"use client";

import { Overlay } from "@/app/components/Overlay";
import { RadioButtonButton } from "@/app/components/RadioButtonButton";
import { Sheet } from "@/app/components/Sheet";
import { Toggle } from "@/app/components/Toggle";
import { Category } from "@generated/prisma";
import { useEscapeKey } from "captain-react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { addAddOn } from "../actions";
import { toast } from "sonner";
import { link } from "@/app/shared/links";

const NewAddOnButton = ({ categories }: { categories: Category[] }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEscapeKey(() => {
    setIsSheetOpen(false);
  });

  const handleSubmit = async (formData: FormData) => {
    const result = await addAddOn(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Add on added successfully");
      window.location.href = link("/admin/");
    }
  };

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
                <form action={handleSubmit}>
                  <div className="button-group mb-8">
                    <RadioButtonButton
                      name="status"
                      value="2"
                      label="Pending"
                      icon="clock"
                      className="normal-case flex-1"
                      defaultChecked
                    />
                    <RadioButtonButton
                      name="status"
                      value="1"
                      label="Archive"
                      icon="archive"
                      className="normal-case flex-1"
                    />
                    <RadioButtonButton
                      name="status"
                      value="3"
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
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="field">
                    <label htmlFor="githubRepo">GitHub Repository URL</label>
                    <input
                      type="text"
                      id="githubRepo"
                      name="githubRepo"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="addonName">Add on Package Name</label>
                    <input
                      type="text"
                      id="addonName"
                      name="addonName"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="demoUrl">URL of Demo</label>
                    <input type="url" id="demoUrl" name="demoUrl" required />
                  </div>
                  <div className="field">
                    <label htmlFor="briefDescription">Brief Description</label>
                    <textarea
                      id="briefDescription"
                      name="briefDescription"
                      required
                    />
                  </div>
                  {categories && (
                    <div className="field">
                      <label htmlFor="category">Category</label>
                      <select id="category" name="category">
                        <option value="">Select a Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="button-group justify-start up pt-6">
                    <button type="submit" className="button primary">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSheetOpen(false);
                      }}
                    >
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

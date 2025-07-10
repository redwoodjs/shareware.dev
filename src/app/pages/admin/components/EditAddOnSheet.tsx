"use client";

import { Icon } from "@/app/components/Icon";
import { Overlay } from "@/app/components/Overlay";
import { RadioButtonButton } from "@/app/components/RadioButtonButton";
import { Sheet } from "@/app/components/Sheet";
import { Toggle } from "@/app/components/Toggle";
import { useEscapeKey } from "captain-react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { AddOnWithCategoryAndStatus } from "../DashboardPage";
import { Category } from "@generated/prisma";
import { toast } from "sonner";
import { updateAddOn } from "../actions";
import { DragAndDropWithPreviews } from "@/app/components/DragAndDropWithPreviews";
import { RequiredField } from "@/app/components/RequiredField";

const EditAddOnSheet = ({
  addOn,
  categories,
  isOpen,
  handleClose,
}: {
  addOn: AddOnWithCategoryAndStatus;
  categories: Category[];
  isOpen: boolean;
  handleClose: () => void;
}) => {
  useEscapeKey(handleClose);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateAddOn(formData);
    if (result.success) {
      toast.success("Add-on updated successfully");
      // refresh the page
      window.location.reload();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay />
          <motion.div
            initial={{ x: "100%", y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: "100%", y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-[var(--z-index-window)]"
          >
            <Sheet handleClose={handleClose}>
              <h2 className="subheading mb-8">Edit {addOn.name}</h2>
              <form action={handleSubmit}>
                <div className="button-group mb-8">
                  <RadioButtonButton
                    name="status"
                    value="2"
                    label="Pending"
                    icon="clock"
                    className="normal-case flex-1"
                    defaultChecked={addOn.status.name === "pending"}
                  />
                  <RadioButtonButton
                    name="status"
                    value="1"
                    label="Archive"
                    icon="archive"
                    className="normal-case flex-1"
                    defaultChecked={addOn.status.name === "archived"}
                  />
                  <RadioButtonButton
                    name="status"
                    value="3"
                    label="Approved"
                    icon="check"
                    className="normal-case flex-1"
                    defaultChecked={addOn.status.name === "approved"}
                  />
                </div>
                <div className="field">
                  <Toggle
                    name="featured"
                    value="featured"
                    defaultChecked={addOn.featured}
                    label="Featured on the homepage?"
                  />
                </div>
                <div className="field">
                  <Toggle
                    name="official"
                    value="official"
                    defaultChecked={addOn.official}
                    label="Official Add-on?"
                  />
                </div>
                <div className="field">
                  <a
                    href="#"
                    className="flex gap-2 text-lg text-link underline font-bold hover:text-link-hover"
                  >
                    <Icon id="github" className="text-black" size={32} />
                    {addOn.owner}/{addOn.repo}
                  </a>
                </div>
                <div className="field">
                  <label htmlFor="firstName">
                    First Name <RequiredField />
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={addOn.firstName}
                    name="firstName"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="lastName">
                    Last Name <RequiredField />
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue={addOn.lastName}
                    name="lastName"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">
                    Email <RequiredField />
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={addOn.email}
                    name="email"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="githubRepo">
                    GitHub Repository URL <RequiredField />
                  </label>
                  <input
                    type="text"
                    id="githubRepo"
                    name="githubRepo"
                    defaultValue={`https://github.com/${addOn.owner}/${addOn.repo}`}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="addonName">
                    Add on Package Name <RequiredField />
                  </label>
                  <input
                    type="text"
                    id="addonName"
                    defaultValue={addOn.name}
                    name="addonName"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="demoUrl">URL of Demo</label>
                  <input
                    type="url"
                    id="demoUrl"
                    defaultValue={addOn.demo}
                    name="demoUrl"
                  />
                </div>
                <div className="field">
                  <label htmlFor="coverImage">
                    Cover Image <RequiredField />
                  </label>
                  <DragAndDropWithPreviews
                    name="coverImage"
                    accept="image/*"
                    defaultValue={addOn.cover ?? undefined}
                    multiple={false}
                  />
                  <input
                    type="hidden"
                    name="prevCoverImage"
                    value={addOn.cover ?? ""}
                  />
                  <p className="text-xs">Recommended size: 1024x512</p>
                </div>
                <div className="field">
                  <label htmlFor="briefDescription">
                    Brief Description <RequiredField />
                  </label>
                  <textarea
                    id="briefDescription"
                    defaultValue={addOn.description}
                    name="briefDescription"
                    required
                  />
                </div>
                {categories && (
                  <div className="field">
                    <label htmlFor="category">
                      Category <RequiredField />
                    </label>
                    <select
                      id="category"
                      name="category"
                      defaultValue={addOn.category.id}
                      required
                    >
                      <option value="">Select a Category</option>
                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          selected={category.id === addOn.category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="button-group justify-start up pt-6">
                  <input type="hidden" name="addOnId" value={addOn.id} />
                  <button type="submit" className="button primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
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
  );
};

export { EditAddOnSheet };

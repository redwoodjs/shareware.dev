"use client";

import { AnimatePresence } from "motion/react";

import { Overlay } from "@/app/components/Overlay";
import { Sheet } from "@/app/components/Sheet";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";
import { Role } from "@generated/prisma";
import { addUser } from "../actions";
import { toast } from "sonner";

const NewUserButton = ({ roles }: { roles: Role[] }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(() => setIsSheetOpen(false), menuRef);
  useEscapeKey(() => setIsSheetOpen(false));

  const handleSubmit = async (formData: FormData) => {
    const result = await addUser(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("User added successfully");
      setIsSheetOpen(false);
    }
  };

  return (
    <div>
      <button className="button primary" onClick={() => setIsSheetOpen(true)}>
        Invite
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
                <h2 className="subheading mb-6">New User</h2>
                <form action={handleSubmit}>
                  <div className="field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      name="firstName"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" required name="lastName" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required name="email" />
                  </div>
                  {roles && (
                    <div className="field fieldset">
                      <legend>Role</legend>
                      <div>
                        {roles.map((role, index) => (
                          <label
                            key={index}
                            htmlFor={`role-${role.id}`}
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              id={`role-${role.id}`}
                              name="role"
                              value={role.id}
                            />
                            {role.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="field button-group relative z-[var(--z-index-window-buttons)]">
                    <button type="submit" className="button primary">
                      Submit
                    </button>
                    <button
                      className="button"
                      role="button"
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
    </div>
  );
};

export { NewUserButton };

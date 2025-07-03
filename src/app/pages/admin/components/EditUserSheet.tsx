"use client";

import { Overlay } from "@/app/components/Overlay";
import { Sheet } from "@/app/components/Sheet";
import { UserWithRole } from "@/worker";
import { Role } from "@generated/prisma";
import { useEscapeKey } from "captain-react-hooks";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { updateUser } from "../actions";
import { Badge } from "@/app/components/Badge";

const EditUserSheet = ({
  isOpen,
  handleClose,
  user,
  roles,
}: {
  isOpen: boolean;
  handleClose: () => void;
  user: UserWithRole;
  roles: Role[];
}) => {
  useEscapeKey(handleClose);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateUser(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("User updated successfully");
      handleClose();
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
              <h2 className="subheading mb-6">
                Edit {user.firstName} {user.lastName}
              </h2>
              <div className="mb-6">
                <Badge label={user.verified ? "Verified" : "Unverified"} />
              </div>
              <form action={handleSubmit}>
                <div className="field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    defaultValue={user.firstName}
                  />
                </div>
                <div className="field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    defaultValue={user.lastName}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    defaultValue={user.email}
                  />
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
                            defaultChecked={user.role.id === role.id}
                          />
                          {role.name}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div className="field button-group up relative z-[var(--z-index-window-buttons)] pt-4">
                  <input type="hidden" name="userId" value={user.id} />
                  <button className="button primary" role="submit">
                    Submit
                  </button>
                  <button
                    className="button"
                    role="button"
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

export { EditUserSheet };

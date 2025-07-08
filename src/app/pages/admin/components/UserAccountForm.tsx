"use client";

import { Icon } from "@/app/components/Icon";
import { Toggle } from "@/app/components/Toggle";
import { User } from "@generated/prisma";
import { DeleteUser } from "./DeleteUser";
import { useState } from "react";
import { toast } from "sonner";
import { updateAccount } from "../actions";
import { DragAndDropAvatar } from "@/app/components/DragAndDropAvatar";

const UserAccountForm = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    formData.append("userId", user.id);

    const result = await updateAccount(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("User updated successfully");
    }
  };

  return (
    <>
      <form
        action={handleSubmit}
        encType="multipart/form-data"
        className="grid grid-cols-[160px_1fr] gap-x-12"
      >
        <div>
          <DragAndDropAvatar
            name="avatar"
            userId={user.id}
            defaultValue={user.avatar ?? ""}
          />
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              defaultValue={user.firstName}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={user.lastName}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              required
            />
          </div>
          <div className="field full mt-2">
            <Toggle
              name="notifyNewAddOns"
              label="Notify me when a new add-on is submitted."
              value="true"
              defaultChecked={user.notifyNewAddOns}
            />
          </div>
          <div className="field">
            <label htmlFor="newPassword">New Password</label>
            <input type="password" name="newPassword" />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" />
          </div>

          <div className="field full button-group mt-3">
            <button type="submit" className="button primary">
              Submit
            </button>
            <button
              type="button"
              role="button"
              className="no-bg destructive"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              <Icon id="trash" />
              Delete Account
            </button>
          </div>
        </div>
      </form>
      <DeleteUser
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        user={user}
      />
    </>
  );
};

export { UserAccountForm };

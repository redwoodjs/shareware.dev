"use client";

import { Overlay } from "@/app/components/Overlay";
import { Window } from "@/app/components/Window";
import { UserWithRole } from "@/worker";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";
import { AnimatePresence } from "motion/react";
import { useRef } from "react";
import { toast } from "sonner";
import { deleteUser } from "../actions";

const DeleteUser = ({
  isOpen,
  handleClose,
  user,
}: {
  isOpen: boolean;
  handleClose: () => void;
  user: UserWithRole;
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  useOutsideClick(handleClose, windowRef);

  useEscapeKey(handleClose);

  const handleSubmit = async () => {
    const result = await deleteUser(user.id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("User deleted successfully");
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed full-screen center z-[var(--z-index-window)]">
          <Overlay />
          <div
            ref={windowRef}
            className="max-w-[690px] w-full z-[var(--z-index-window)] relative"
          >
            <Window title="Are you sure?" closable={true} onClose={handleClose}>
              <div className="p-7">
                <div className="flex gap-x-4 mb-[70px]">
                  <div>
                    <img
                      src="/images/info-icon.png"
                      alt="Info Icon"
                      srcSet="/images/info-icon@2x.png 2x, /images/info-icon.png 1x"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-chicago mb-3 text-destructive">
                      Are you sure you want to delete this User?
                    </p>
                    <p className="font-sans">This action cannot be undone.</p>
                  </div>
                </div>
                <form
                  action={handleSubmit}
                  className="button-group up justify-end"
                >
                  <button className="button" onClick={handleClose}>
                    Cancel
                  </button>
                  <button className="button primary" role="submit">
                    Delete
                  </button>
                </form>
              </div>
            </Window>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export { DeleteUser };

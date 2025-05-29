"use client";

import { Overlay } from "@/app/components/Overlay";
import { Window } from "@/app/components/Window";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";
import { AnimatePresence } from "motion/react";
import { useRef } from "react";
import { toast } from "sonner";
import { deleteAddOn } from "../actions";
import { link } from "@/app/shared/links";

const DeleteAddOn = ({
  addOnId,
  isOpen,
  handleClose,
}: {
  addOnId: string;
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  useOutsideClick(handleClose, windowRef);

  useEscapeKey(handleClose);

  const handleSubmit = async (formData: FormData) => {
    const result = await deleteAddOn(addOnId);
    if (result.success) {
      toast.success("Add-on deleted successfully");
      window.location.href = link("/admin/");
    } else {
      toast.error("Failed to delete add-on");
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
                      Are you sure you want to delete this Add On?
                    </p>
                    <p className="font-sans">This action cannot be undone.</p>
                  </div>
                </div>
                <form
                  className="button-group up justify-end"
                  action={handleSubmit}
                >
                  <input type="hidden" name="id" value={addOnId} />
                  <button
                    className="button"
                    role="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button className="button primary" type="submit">
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

export { DeleteAddOn };

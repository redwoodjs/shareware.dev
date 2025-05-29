"use client";

import { AnimatePresence } from "motion/react";

import { Overlay } from "@/app/components/Overlay";
import { Sheet } from "@/app/components/Sheet";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";

const NewUserButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(() => setIsSheetOpen(false), menuRef);
  useEscapeKey(() => setIsSheetOpen(false));

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
                <h2 className="subheading mb-0">New User</h2>
                <form>
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
                  <div className="field action-buttons relative z-[var(--z-index-window-buttons)]">
                    <button className="button primary">Submit</button>
                    <button className="button">Cancel</button>
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

"use client";

import { Badge } from "@/app/components/Badge";
import { Credit } from "@/app/components/Credit";
import { Dropdown } from "@/app/components/Dropdown";
import { Icon } from "@/app/components/Icon";
import { EditAddOnSheet } from "./EditAddOnSheet";
import { link } from "@/app/shared/links";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";
import { useDragControls, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const AddOnRow = ({ addon }: { addon: any }) => {
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const [isEditAddOnSheetShowing, setIsEditAddOnSheetShowing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEscapeKey(() => setIsDropdownShowing(false));
  useOutsideClick(() => setIsDropdownShowing(false), menuRef);

  useEffect(() => {
    console.log({ isEditAddOnSheetShowing });
  }, [isEditAddOnSheetShowing]);

  return (
    <motion.div
      className="bg-white relative py-3 px-6 subgrid items-center"
      dragControls={dragControls}
      dragListener={false}
    >
      <button
        className="absolute -left-3 cursor-grab"
        onPointerDown={(e) => {
          e.preventDefault();
          dragControls.start(e);
        }}
      >
        <img src="/images/move.svg" alt="Reorder Add On Row" />
      </button>
      <div>
        <Badge label="Archived" status="archived" />
      </div>
      <div>
        <a
          href="#"
          className="text-link underline hover:text-link-hover font-sans font-bold text-lg"
        >
          {addon.name}
        </a>
      </div>
      <div>
        <Credit
          avatar={{
            src: "/images/placeholder-avatar.png",
            alt: "RedwoodJS",
          }}
          owner="redwoodjs"
          repo="redwood"
        />
      </div>
      <div className="tag-group">
        <Badge label="Tag 1" />
        <Badge label="Tag 1" />
      </div>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsDropdownShowing((prevValue) => !prevValue)}
          className={`flex hover:bg-black hover:text-white rounded-corners cursor-pointer p-2 z-[var(--z-index-dropdown-trigger)] ${
            isDropdownShowing ? "bg-black text-white" : ""
          }`}
        >
          <Icon id="dotsHorizontal" />
        </button>
        <EditAddOnSheet
          isOpen={isEditAddOnSheetShowing}
          handleClose={() => setIsEditAddOnSheetShowing(false)}
        />
        {isDropdownShowing && (
          <div className="absolute top-11 right-0 z-[var(--z-index-dropdown)]">
            <Dropdown
              showSeparator={true}
              options={[
                {
                  icon: "link",
                  label: "View Demo",
                  href: "#",
                },
                {
                  icon: "view",
                  label: "View Details",
                  href: link("/addon/:slug", { slug: "redwoodjs" }),
                },
                {
                  icon: "github",
                  label: "On GitHub",
                  href: "#",
                },
                {
                  icon: "edit",
                  label: "Edit",
                  handleClick: () => {
                    console.log("edit");
                    setIsEditAddOnSheetShowing(true);
                    setIsDropdownShowing(false);
                  },
                },
                {
                  icon: "trash",
                  label: "Delete",
                  className: "text-destructive",
                },
              ]}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export { AddOnRow };

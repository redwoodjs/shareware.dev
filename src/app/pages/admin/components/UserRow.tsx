"use client";

import { Avatar } from "@/app/components/Avatar";
import { Dropdown } from "@/app/components/Dropdown";
import { Icon } from "@/app/components/Icon";
import { useOutsideClick } from "captain-react-hooks";
import { useRef, useState } from "react";
import { EditUserSheet } from "./EditUserSheet";
import { DeleteUser } from "./DeleteUser";

const UserRow = () => {
  const [isEditUserSheetOpen, setIsEditUserSheetOpen] = useState(false);
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(() => setIsDropdownShowing(false), menuRef);

  return (
    <div className="bg-white relative py-3 px-6 subgrid items-center">
      <div className="font-bold text-lg flex items-center gap-2">
        <Avatar
          src="/images/placeholder-avatar.png"
          alt="Amy Dutton"
          size={32}
        />
        Amy Dutton
      </div>
      <div>
        <a
          href="mailto:amy@redwoodjs.com"
          className="text-link hover:text-link-hover underline font-bold"
        >
          amy@redwoodjs.com
        </a>
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
        <EditUserSheet
          isOpen={isEditUserSheetOpen}
          handleClose={() => setIsEditUserSheetOpen(false)}
        />
        <DeleteUser
          isOpen={isDeleteUserOpen}
          handleClose={() => setIsDeleteUserOpen(false)}
        />
        {isDropdownShowing && (
          <div className="absolute top-11 right-0 z-[var(--z-index-dropdown)]">
            <Dropdown
              showSeparator={true}
              options={[
                {
                  icon: "edit",
                  label: "Edit",
                  handleClick: () => {
                    setIsEditUserSheetOpen(true);
                    setIsDropdownShowing(false);
                  },
                },
                {
                  icon: "trash",
                  label: "Delete",
                  className: "text-destructive",
                  handleClick: () => {
                    setIsDeleteUserOpen(true);
                    setIsDropdownShowing(false);
                  },
                },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { UserRow };

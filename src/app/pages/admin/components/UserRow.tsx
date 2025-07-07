"use client";

import { Avatar } from "@/app/components/Avatar";
import { Dropdown } from "@/app/components/Dropdown";
import { Icon } from "@/app/components/Icon";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";
import { useRef, useState } from "react";
import { EditUserSheet } from "./EditUserSheet";
import { DeleteUser } from "./DeleteUser";
import { UserWithRole } from "@/worker";
import { Badge } from "@/app/components/Badge";
import { Role } from "@generated/prisma";

const UserRow = ({ user, roles }: { user: UserWithRole; roles: Role[] }) => {
  const [isEditUserSheetOpen, setIsEditUserSheetOpen] = useState(false);
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(() => setIsDropdownShowing(false), menuRef);
  useEscapeKey(() => setIsDropdownShowing(false));

  return (
    <div className="bg-white relative py-3 px-6 subgrid items-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsEditUserSheetOpen(true);
        }}
        role="button"
        className="font-bold text-lg flex items-center gap-2 cursor-pointer hover:text-link-hover hover:underline"
      >
        <Avatar
          src={user.avatar || ""}
          alt={`${user.firstName} ${user.lastName}`}
          size={32}
        />
        {user.firstName} {user.lastName}
      </button>
      <div>{user.email}</div>
      <div>
        <Badge label={user.role.name} className="capitalize" />
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
          user={user}
          roles={roles}
        />
        <DeleteUser
          isOpen={isDeleteUserOpen}
          handleClose={() => setIsDeleteUserOpen(false)}
          user={user}
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

"use client";

import { useRef, useState } from "react";
import { link } from "../shared/links";
import { Avatar } from "./Avatar";
import { Dropdown } from "./Dropdown";
import { Icon } from "./Icon";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";
import { User } from "@/db";
import { toggleAdminBar } from "../pages/actions";

const AdminBar = ({
  user,
  hideAddOnControls = true,
  defaultExpanded = false,
}: {
  user: User | null;
  hideAddOnControls?: boolean;
  defaultExpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEscapeKey(() => setIsDropdownShowing(false));
  useOutsideClick(() => setIsDropdownShowing(false), dropdownRef);

  const handleToggleAdminBar = async () => {
    const newIsExpanded = !isExpanded;
    setIsExpanded((prevValue) => !prevValue);
    if (user) {
      console.log({ userId: user.id, newIsExpanded });
      await toggleAdminBar(user.id, newIsExpanded);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div
      className={`transition-all duration-500 bg-white border-2 gap-3 border-black flex items-center justify-between fixed bottom-2 w-[calc(100%-20px)] py-3 pl-2 pr-7 z-[var(--z-index-admin-bar)]
      ${isExpanded ? "right-2" : "right-[calc(100%_-_30px)]"}
    `}
    >
      <a href={link("/admin/")} className="button primary">
        Admin Panel
      </a>
      {!hideAddOnControls && (
        <div className="flex items-center justify-center gap-3 flex-1">
          <button className="admin-bar-button button">
            <Icon id="check" />
            Approve
          </button>
          <button className="admin-bar-button button">
            <Icon id="clock" />
            Mark as Pending
          </button>
          <button className="admin-bar-button button">
            <Icon id="archive" />
            Archive
          </button>
          <button className="admin-bar-button button">
            <Icon id="star" />
            Featured
          </button>
          <button className="admin-bar-button button">
            <Icon id="edit" />
            Edit
          </button>
        </div>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          className="cursor-pointer"
          onClick={() => setIsDropdownShowing((prevValue) => !prevValue)}
        >
          <Avatar
            src={user.avatar || ""}
            alt={`${user.firstName} ${user.lastName}`}
            size={56}
          />
        </button>
        {isDropdownShowing && (
          <div className="absolute bottom-20 -right-[14px]">
            <Dropdown
              options={[
                {
                  label: "Users",
                  href: link("/admin/users"),
                  icon: "user",
                },
                {
                  label: "Settings",
                  href: link("/admin/settings"),
                  icon: "gear",
                },
                {
                  label: "Logout",
                  href: link("/logout"),
                  icon: "logout",
                },
              ]}
            />
          </div>
        )}
      </div>
      <div className="absolute right-0 top-0 h-[80px] block">
        <button
          className="cursor-pointer hover:bg-black hover:text-white h-full"
          onClick={handleToggleAdminBar}
        >
          <Icon
            id="chevronDown"
            className={isExpanded ? "rotate-90" : "-rotate-90"}
          />
        </button>
      </div>
    </div>
  );
};

export { AdminBar };

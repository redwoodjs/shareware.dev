"use client";

import { useRef, useState } from "react";
import { link } from "../shared/links";
import { Avatar } from "./Avatar";
import { Dropdown } from "./Dropdown";
import { Icon } from "./Icon";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";

const AdminBar = ({
  hideAddOnControls = true,
}: {
  hideAddOnControls?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEscapeKey(() => setIsDropdownShowing(false));
  useOutsideClick(() => setIsDropdownShowing(false), dropdownRef);

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
            src="/images/placeholder-avatar.png"
            alt="Amy Dutton"
            size={56}
          />
        </button>
        {isDropdownShowing && (
          <div className="absolute bottom-20 -right-[14px]">
            <Dropdown
              options={[
                {
                  label: "Users",
                  href: "/admin/users",
                  icon: "user",
                },
                {
                  label: "Settings",
                  href: "/admin/settings",
                  icon: "gear",
                },
                {
                  label: "Logout",
                  href: "/admin/logout",
                  icon: "logout",
                },
              ]}
            />
          </div>
        )}
      </div>
      <div className="absolute right-0 top-0 h-[86px] block">
        <button
          className="cursor-pointer hover:bg-black hover:text-white h-full"
          onClick={() => setIsExpanded((prevValue) => !prevValue)}
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

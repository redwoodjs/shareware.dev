"use client";

import { Icon } from "@/app/components/Icon";
import { useState } from "react";
import { IconName } from "../../../types/icons";

type DropdownItem = {
  label?: string;
  href?: string;
  icon?: null | IconName;
  className?: string;
  handleClick?: () => void;
  selected?: boolean;
};

const Dropdown = ({
  options,
  callback = () => {},
  showSeparator = false,
  selectable = false,
}: {
  options: DropdownItem[];
  callback?: () => void;
  showSeparator?: boolean;
  selectable?: boolean;
}) => {
  const [selected, setSelected] = useState<DropdownItem | null>(
    options.find((option) => option.selected) || null
  );

  return (
    <ul
      className={`border-1 border-black bg-white inline-flex flex-col w-full font-chicago ${
        showSeparator ? "show-separator" : ""
      }`}
    >
      {options.map((option, key) => {
        if (option.href) {
          return (
            <li key={key} className={option.className ? option.className : ""}>
              <a
                href={option.href}
                className={`dropdown-item ${
                  selected?.label === option.label ? "selected" : ""
                }`}
              >
                {option.icon && <Icon id={option.icon} size={24} />}
                {option.label && (
                  <span className="flex-1 text-left">{option.label}</span>
                )}
                {selected?.label === option.label && (
                  <Icon id="check" size={24} />
                )}
              </a>
            </li>
          );
        }
        return (
          <li key={key} className={option.className ? option.className : ""}>
            <button
              onClick={() => {
                option.handleClick?.();
                if (selectable) {
                  setSelected(option);
                }
                callback();
              }}
              className={`dropdown-item cursor-pointer ${
                selected?.label === option.label ? "selected" : ""
              }`}
            >
              {option.icon && <Icon id={option.icon} size={24} />}
              {option.label && (
                <span className="flex-1 text-left">{option.label}</span>
              )}
              {selected?.label === option.label && (
                <Icon id="check" size={24} />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export { Dropdown };

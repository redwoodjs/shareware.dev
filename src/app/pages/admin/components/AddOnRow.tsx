"use client";

import { Badge, BadgeStatus } from "@/app/components/Badge";
import { Credit } from "@/app/components/Credit";
import { Dropdown } from "@/app/components/Dropdown";
import { Icon } from "@/app/components/Icon";
import { EditAddOnSheet } from "./EditAddOnSheet";
import { link } from "@/app/shared/links";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";
import { useDragControls, motion } from "motion/react";
import { useRef, useState } from "react";
import { DeleteAddOn } from "./DeleteAddOn";
import { AddOnWithCategoryAndStatus } from "../DashboardPage";
import { Category } from "@generated/prisma";

const AddOnRow = ({
  addon,
  categories,
}: {
  addon: AddOnWithCategoryAndStatus;
  categories: Category[];
}) => {
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEscapeKey(() => {
    setIsDropdownShowing(false);
    setIsEditSheetOpen(false);
  });
  useOutsideClick(() => setIsDropdownShowing(false), menuRef);

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
        <Badge
          label={addon.featured ? "Featured" : addon.status.name}
          status={
            addon.featured
              ? "featured"
              : (addon.status.name.toLowerCase() as BadgeStatus)
          }
        />
      </div>
      <div>
        <a
          href={link("/addon/:slug", { slug: addon.id })}
          className="text-link underline hover:text-link-hover font-sans font-bold text-lg"
        >
          {addon.name}
        </a>
      </div>
      <div className="w-full">
        <Credit
          avatar={{
            src: addon.avatar ?? undefined,
            alt: addon.owner,
          }}
          owner={addon.owner}
          repo={addon.repo}
        />
      </div>
      <div className="tag-group">
        <Badge label={addon.category.name} />
      </div>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsDropdownShowing((prev) => !prev)}
          className={`flex hover:bg-black hover:text-white rounded-corners cursor-pointer p-2 z-[var(--z-index-dropdown-trigger)] ${
            isDropdownShowing ? "bg-black text-white" : ""
          }`}
        >
          <Icon id="dotsHorizontal" />
        </button>
        <EditAddOnSheet
          addOn={addon}
          categories={categories}
          isOpen={isEditSheetOpen}
          handleClose={() => setIsEditSheetOpen(false)}
        />
        <DeleteAddOn
          addOnId={addon.id}
          isOpen={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(false)}
        />
        {isDropdownShowing && (
          <div className="absolute top-11 right-0 z-[var(--z-index-dropdown)]">
            <Dropdown
              showSeparator={true}
              options={[
                {
                  icon: "link",
                  label: "View Demo",
                  href: addon.demo,
                },
                {
                  icon: "view",
                  label: "View Details",
                  href: link("/addon/:slug", { slug: addon.id }),
                },
                {
                  icon: "github",
                  label: "On GitHub",
                  href: `https://github.com/${addon.owner}/${addon.repo}`,
                },
                {
                  icon: "edit",
                  label: "Edit",
                  handleClick: () => {
                    setIsEditSheetOpen(true);
                    setIsDropdownShowing(false);
                  },
                },
                {
                  icon: "trash",
                  label: "Delete",
                  className: "text-destructive",
                  handleClick: () => {
                    setIsDeleteModalOpen(true);
                    setIsDropdownShowing(false);
                  },
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

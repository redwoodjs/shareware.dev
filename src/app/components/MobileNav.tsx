"use client";

import { useState } from "react";
import { constants } from "../lib/constants";
import { link } from "../shared/links";
import { Icon } from "./Icon";
import { type Doc } from "content-collections";
import { type AddOn } from "@generated/prisma";

const MobileNav = ({
  addOns,
  allDocLinks,
}: {
  addOns: Partial<AddOn>[];
  allDocLinks: Partial<Doc>[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* hamburger */}
      <button
        className={`hamburger relative z-(--z-index-mobile-nav-trigger) ${
          isOpen ? "open" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div />
        <div />
        <div />
      </button>
      {/* mobile nav links */}
      {isOpen && (
        <div className="mobile-nav fixed inset-0 w-full h-full bg-black z-(--z-index-mobile-nav)">
          <ul>
            <li>
              <a href={link("/")}>Home</a>
            </li>
            <li>
              <a href={link("/docs/:slug", { slug: "introduction" })}>
                Add Ons
              </a>
            </li>
            <li>
              <a href={constants.DOCS} className="flex items-center gap-[2px]">
                RWSDK Docs
                <Icon
                  id="externalLink"
                  size={16}
                  className="relative -top-[1px]"
                />
              </a>
            </li>
          </ul>
          <hr className="border-white my-4" />
          <ul>
            <li className="header">Getting Started</li>
            {allDocLinks.map((doc, index) => (
              <li key={index}>
                <a href={link("/docs/:slug", { slug: doc.slug ?? "" })}>
                  {doc.title}
                </a>
              </li>
            ))}
            <li>
              <a href={link("/submit")}>Submit an Add On</a>
            </li>
          </ul>
          <hr className="border-white my-4" />
          <ul>
            <li className="header">Add-Ons</li>
            {addOns.map((addOn) => (
              <li key={addOn.id}>
                <a href={link("/addon/:slug", { slug: addOn.id ?? "" })}>
                  {addOn.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { MobileNav };

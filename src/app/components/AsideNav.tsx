import { db } from "@/db";
import { link } from "../shared/links";

const AsideNav = async () => {
  // get all the approved add ons
  const addOns = await db.addOn.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      status: {
        name: "approved",
      },
    },
  });

  return (
    <aside className="aside-nav">
      <ul className="font-chicago flex flex-col gap-y-3">
        <li className="header">Getting Started</li>
        <li>
          <a href={link("/docs/:slug", { slug: "introduction" })}>
            Introduction
          </a>
        </li>
        <li>
          <a href={link("/docs/:slug", { slug: "installation" })}>
            Installation
          </a>
        </li>
        <li>
          <a href={link("/docs/:slug", { slug: "jsonc" })}>addons.jsonc</a>
        </li>
        <li>
          <a href={link("/docs/:slug", { slug: "changelog" })}>Changelog</a>
        </li>
        <li>
          <a href={link("/submit")}>Submit an Add On</a>
        </li>
        <li className="h-12"></li>
        <li className="header">Add Ons</li>
        {addOns.map((addOn) => (
          <li key={addOn.id}>
            <a href={link("/addon/:slug", { slug: addOn.id })}>{addOn.name}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export { AsideNav };

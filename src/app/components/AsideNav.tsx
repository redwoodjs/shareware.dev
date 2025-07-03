import { db } from "@/db";
import { link } from "../shared/links";

const AsideNav = async ({ currentPath }: { currentPath: string }) => {
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
          <a
            href={link("/docs/:slug", { slug: "introduction" })}
            className={`${
              currentPath === link("/docs/:slug", { slug: "introduction" })
                ? "active-nav-link"
                : ""
            }`}
          >
            Introduction
          </a>
        </li>
        <li>
          <a
            href={link("/submit")}
            className={currentPath === link("/submit") ? "active-nav-link" : ""}
          >
            Submit an Add On
          </a>
        </li>
        <li className="h-12"></li>
        <li className="header">Add Ons</li>
        {addOns.map((addOn) => (
          <li key={addOn.id}>
            <a
              href={link("/addon/:slug", { slug: addOn.id })}
              className={
                currentPath === link("/addon/:slug", { slug: addOn.id })
                  ? "active-nav-link"
                  : ""
              }
            >
              {addOn.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export { AsideNav };

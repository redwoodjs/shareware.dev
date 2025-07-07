import { db } from "@/db";
import { link } from "../shared/links";
import { allDocs } from "content-collections";

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

  console.log(allDocs);
  const allDocLinks = allDocs.map((doc) => {
    return {
      slug: doc.slug,
      title: doc.title,
    };
  });

  return (
    <aside className="aside-nav">
      <ul className="font-chicago flex flex-col gap-y-3">
        <li className="header">Getting Started</li>
        {allDocLinks.map((doc) => (
          <li>
            <a
              href={link("/docs/:slug", { slug: doc.slug })}
              className={`${
                currentPath === link("/docs/:slug", { slug: doc.slug })
                  ? "active-nav-link"
                  : ""
              }`}
            >
              {doc.title}
            </a>
          </li>
        ))}
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

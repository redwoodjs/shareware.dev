import { link } from "../shared/links";

const AsideNav = () => {
  return (
    <aside className="aside-nav">
      <ul className="font-chicago flex flex-col gap-y-3">
        <li className="header">Getting Started</li>
        <li>
          <a href={link("/docs/:slug", { slug: "all" })}>Introduction</a>
        </li>
        <li>
          <a href={link("/docs/:slug", { slug: "all" })}>Installation</a>
        </li>
        <li>
          <a href={link("/docs/:slug", { slug: "all" })}>addons.jsonc</a>
        </li>
        <li>
          <a href={link("/docs/:slug", { slug: "all" })}>Changelog</a>
        </li>
        <li>
          <a href={link("/submit")}>Submit an Add On</a>
        </li>
        <li className="h-12"></li>
        <li className="header">Add Ons</li>
        <li>
          <a href={link("/addon/:slug", { slug: "changelog" })}>Changelog</a>
        </li>
      </ul>
    </aside>
  );
};

export { AsideNav };

import { constants } from "../lib/constants";
import { link } from "../shared/links";
import { Icon } from "./Icon";
import { Search } from "./Search";

const Nav = () => {
  return (
    <div className="flex items-center gap-8 font-chicago">
      <nav className="main-nav">
        <ul className="flex items-center gap-8">
          <li>
            <a href={link("/")}>Home</a>
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
          <li>
            <a href={link("/docs/:slug", { slug: "introduction" })}>Add Ons</a>
          </li>
          <li>
            <a href="#">Request an Add On</a>
          </li>
          {/* <li>
              <ThemeSwitcher />
            </li> */}
          <li>
            <Search />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { Nav };

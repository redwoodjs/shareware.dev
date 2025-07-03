import { link } from "../shared/links";
import { Badge } from "./Badge";
import { Credit } from "./Credit";

const SearchResultsRow = () => {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-10">
      <div className="flex items-center gap-3">
        <img
          src="/images/right-triangle.png"
          alt="Right Triangle"
          srcSet="/images/right-triangle.png 1x, /images/right-triangle@2x.png 2x"
        />
        <img src="/images/folder.png" alt="Folder" />
        <div className="font-sans text-base font-bold">
          <a
            href={link("/addon/:slug", { slug: "form-to-github-issue" })}
            className="text-link underline hover:text-link-hover bg-none hover:bg-transparent"
          >
            Form to GitHub Issue
          </a>
        </div>
      </div>

      <div>
        <Credit
          avatar={{
            src: "/images/placeholder-avatar.png",
            alt: "Amy Dutton",
          }}
          owner="ahaywood"
          repo="redwood-auth-github"
        />
      </div>

      <div className="text-sm">
        <Badge label="Productivity" />
      </div>
    </div>
  );
};

export { SearchResultsRow };

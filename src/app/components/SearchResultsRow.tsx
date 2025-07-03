import { AddOn } from "@generated/prisma";
import { link } from "../shared/links";
import { Badge } from "./Badge";
import { Credit } from "./Credit";
import { AddOnWithCategory } from "./Nav";

const SearchResultsRow = ({
  addOn,
  isSelected,
}: {
  addOn: AddOnWithCategory;
  isSelected: boolean;
}) => {
  return (
    <div
      className={`grid grid-cols-[1fr_300px_150px] items-center gap-10 border-3 p-2 ${
        isSelected ? "border-link" : "border-transparent"
      }`}
    >
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
            {addOn.name}
          </a>
        </div>
      </div>

      <div>
        <Credit
          avatar={{
            alt: `${addOn.owner}`,
          }}
          owner={addOn.owner}
          repo={addOn.repo}
        />
      </div>

      <div className="text-sm text-right">
        <Badge label={addOn.category.name} />
      </div>
    </div>
  );
};

export { SearchResultsRow };

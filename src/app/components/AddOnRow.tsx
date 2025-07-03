import { AddOn } from "@generated/prisma";
import { link } from "../shared/links";
import { CopyCode } from "./CopyCode";
import { Window } from "./Window";

const AddOnRow = ({ addon }: { addon: AddOn }) => {
  return (
    <div className="grid grid-cols-2 gap-12">
      <div>
        <Window title="Feature Request">
          <>
            <a href={link("/addon/:slug", { slug: addon.id })}>
              <img src="/images/placeholder-addon.png" alt="Add On" />
            </a>
          </>
        </Window>
      </div>
      <div>
        <h2 className="subheading mb-4">
          <a
            href={link("/addon/:slug", { slug: addon.id })}
            className="hover:text-link-hover visited:text-link-visited"
          >
            {addon.name}
          </a>
        </h2>
        <p className="font-chicago text-xl mb-6 tracking-tight">
          {addon.description}
        </p>
        <div className="button-group">
          <a
            href={addon.demo}
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            Live Demo
          </a>
          <a
            href={link("/addon/:slug", { slug: addon.id })}
            className="button primary"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export { AddOnRow };

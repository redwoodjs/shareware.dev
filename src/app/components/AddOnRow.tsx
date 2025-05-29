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
            <a href={link("/addon/:slug", { slug: "test" })}>
              <img src="/images/placeholder-addon.png" alt="Add On" />
            </a>
          </>
        </Window>
      </div>
      <div>
        <h2 className="subheading mb-4">{addon.name}</h2>
        <p className="font-chicago text-xl mb-4 tracking-tight">
          {addon.description}
        </p>
        <div className="mb-4">
          <CopyCode
            code={`npx rwsdk-tools install ${addon.owner}/${addon.repo}`}
          />
        </div>
        <p>{addon.description}</p>
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

import { link } from "../shared/links";
import { CopyCode } from "./CopyCode";
import { Window } from "./Window";

const AddOnRow = () => {
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
        <h2 className="subheading mb-4">Feature Requests</h2>
        <p className="font-chicago text-xl mb-4 tracking-tight">
          Let users suggest and vote on new features.
        </p>
        <div className="mb-4">
          <CopyCode code="npm install @redwoodjs/sdk-add-on-feature-requests" />
        </div>
        <p>
          Complete voting system with user authentication, comment threads,
          status tracking, and admin dashboard. Users can submit ideas, vote on
          favorites, and track development progress.
        </p>
        <div className="button-group">
          <button className="button">Live Demo</button>
          <a
            href={link("/addon/:slug", { slug: "test" })}
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

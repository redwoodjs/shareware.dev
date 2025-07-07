import { AdminBar } from "../components/AdminBar";
import { Credit } from "../components/Credit";
import { Icon } from "../components/Icon";
import { RequestInfo } from "rwsdk/worker";
import { db } from "@/db";
import { Prisma } from "@generated/prisma";
import { AddOnContent } from "../components/AddOnContent";
import { getGitHubAvatarUrl } from "../lib/githubHelpers";

export type AddOnWithStatusAndCategory = Prisma.AddOnGetPayload<{
  include: {
    status: true;
    category: true;
  };
}>;

const AddonPage = async ({ ctx, params }: RequestInfo) => {
  const { slug } = params;

  // get the add on details
  const addon = await db.addOn.findUnique({
    where: {
      id: slug,
    },
    include: {
      status: true,
      category: true,
    },
  });

  // get all the categories
  const categories = await db.category.findMany();

  return (
    <>
      <div className="half-grid">
        {/* left column */}
        <div className="half-grid--left">
          <div className="sticky top-10 pb-20 pr-12">
            <div className="mb-5">
              <Credit
                link={`https://github.com/${addon?.owner}/${addon?.repo}`}
                avatar={{
                  src: getGitHubAvatarUrl(addon?.owner ?? ""),
                  alt: addon?.owner ?? "",
                }}
                owner={addon?.owner ?? ""}
                repo={addon?.repo ?? ""}
              />
            </div>

            <h1 className="page-title">{addon?.name}</h1>
            <p className="text-lg tracking-tight leading-relaxed mb-10">
              {addon?.description}
            </p>
            <a
              href={addon?.demo}
              target="_blank"
              rel="noreferrer"
              className="button primary mb-10"
            >
              View Demo
            </a>

            <ul className="flex gap-x-2 addon-links">
              <li>
                <a
                  href={`https://github.com/${addon?.owner}/${addon?.repo}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon id="github" size={24} />
                  <span>Submit an Issue</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/${addon?.owner}/${addon?.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon id="github" size={24} />
                  <span>View Code on GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* right column */}
        <div className="half-grid--right addon-content">
          <img src="/images/placeholder-addon.png" alt="something" />
          <AddOnContent repo={addon?.repo ?? ""} owner={addon?.owner ?? ""} />
        </div>
      </div>
      <AdminBar
        addOn={addon ?? undefined}
        hideAddOnControls={false}
        user={ctx.user}
        defaultExpanded={ctx.user?.isAdminBarShowing}
        categories={categories}
      />
    </>
  );
};

export { AddonPage };

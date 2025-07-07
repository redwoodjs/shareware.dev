import { AdminBar } from "../components/AdminBar";
import { RequestInfo } from "rwsdk/worker";
import { getHeadings, injectIdsToHeadings } from "../lib/contentHelpers";
import { allLegals } from "content-collections";

const LegalPage = ({ ctx, params }: RequestInfo) => {
  // get the individual page content
  const legal = allLegals.find((legal) => legal.slug === params.slug);

  // Extract headings from HTML content
  const headings = getHeadings(legal?.html ?? "");

  // inject ids to the headings
  const html = injectIdsToHeadings(legal?.html ?? "");

  return (
    <>
      <div className="content-grid">
        <div className="content-grid__main">
          <h1 className="page-title mb-5">{legal?.title}</h1>
          <div
            className="addon-content"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
          />
        </div>

        <aside className="on-this-page-nav text-sm font-bold">
          <div className="sticky top-10 pb-20 text-left inline-block">
            <ul className="flex flex-col gap-3">
              <li className="header">On this Page</li>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    dangerouslySetInnerHTML={{ __html: heading.text }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      <AdminBar user={ctx.user} hideAddOnControls={true} />
    </>
  );
};

export { LegalPage };

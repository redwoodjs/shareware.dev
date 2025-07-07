import { AdminBar } from "../components/AdminBar";
import { RequestInfo } from "rwsdk/worker";
import { allDocs } from "content-collections";
import { getHeadings, injectIdsToHeadings } from "../lib/contentHelpers";

const DocsPage = async ({ ctx, params }: RequestInfo) => {
  // get the individual page content
  const doc = allDocs.find((doc) => doc.slug === params.slug);

  // Extract headings from HTML content
  const headings = getHeadings(doc?.html ?? "");

  // inject ids to the headings
  const html = injectIdsToHeadings(doc?.html ?? "");

  return (
    <>
      <title>RedwoodSDK Add Ons | {doc?.title}</title>
      <meta name="description" content={doc?.description ?? ""} />

      <div className="content-grid pt-12">
        <div className="content-grid__main">
          <h1 className="page-title mb-5">{doc?.title}</h1>
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
                  <a href={`#${heading.id}`}>{heading.text}</a>
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

export { DocsPage };

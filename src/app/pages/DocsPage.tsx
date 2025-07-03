import { AdminBar } from "../components/AdminBar";
import { RequestInfo } from "rwsdk/worker";

const DocsPage = ({ ctx }: RequestInfo) => {
  return (
    <>
      <div className="content-grid">
        <div className="content-grid__main">
          <h1 className="subheading mb-5">Getting Started</h1>
        </div>
        <aside className="on-this-page-nav text-sm font-bold">
          <div className="sticky top-10 pb-20 text-left inline-block">
            <ul className="flex flex-col gap-3">
              <li className="header">On this Page</li>
              <li>
                <a href="#terms-of-service">Terms of Service</a>
              </li>
              <li>
                <a href="#privacy-policy">Privacy Policy</a>
                <ul>
                  <li>
                    <a href="#terms-of-service">- Subheading</a>
                  </li>
                  <li>
                    <a href="#privacy-policy">- Subheading</a>
                  </li>
                  <li>
                    <a href="#privacy-policy">- Subheading</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#terms-of-service">Terms of Service</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <AdminBar user={ctx.user} hideAddOnControls={true} />
    </>
  );
};

export { DocsPage };

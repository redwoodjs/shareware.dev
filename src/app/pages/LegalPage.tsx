import { AdminBar } from "../components/AdminBar";
import { InteriorLayout } from "../layouts/InteriorLayout";

const LegalPage = () => {
  return (
    <InteriorLayout>
      <div className="content-grid">
        <div className="content-grid__main">
          <h1 className="subheading mb-5">Getting Started</h1>
          <p>
            Complete voting system with user authentication, comment threads,
            status tracking, and admin dashboard. Users can submit ideas, vote
            on favorites, and track development progress.
          </p>
          <p>
            Complete voting system with user authentication, comment threads,
            status tracking, and admin dashboard. Users can submit ideas, vote
            on favorites, and track development progress.
          </p>
          <p>
            Complete voting system with user authentication, comment threads,
            status tracking, and admin dashboard. Users can submit ideas, vote
            on favorites, and track development progress.
          </p>
          <p>
            Complete voting system with user authentication, comment threads,
            status tracking, and admin dashboard. Users can submit ideas, vote
            on favorites, and track development progress.
          </p>
          <p>
            Complete voting system with user authentication, comment threads,
            status tracking, and admin dashboard. Users can submit ideas, vote
            on favorites, and track development progress.
          </p>
          <p>
            Complete voting system with user authentication, comment threads,
            status tracking, and admin dashboard. Users can submit ideas, vote
            on favorites, and track development progress.
          </p>
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
      <AdminBar />
    </InteriorLayout>
  );
};

export { LegalPage };

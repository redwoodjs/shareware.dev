import { AdminBar } from "../components/AdminBar";
import { Credit } from "../components/Credit";
import { Icon } from "../components/Icon";
import { InteriorLayout } from "../layouts/InteriorLayout";
import { RequestInfo } from "rwsdk/worker";

const AddonPage = ({ ctx }: RequestInfo) => {
  return (
    <InteriorLayout>
      <div className="half-grid">
        {/* left column */}
        <div className="half-grid--left">
          <div className="sticky top-10 pb-20 pr-12">
            <div className="mb-5">
              <Credit
                link="https://github.com"
                avatar={{ src: "/images/placeholder-avatar.png", alt: "owner" }}
                owner="owner"
                repo="repo"
              />
            </div>

            <h1 className="page-title">Slack Notifications</h1>
            <p className="text-lg tracking-tight leading-relaxed mb-10">
              Configure custom triggers for user signups, form submissions,
              errors, and more. Simple webhook setup with message formatting,
              channel routing, and rate limiting built in.
            </p>
            <a href="#" className="button primary mb-10">
              View Demo
            </a>

            <ul className="flex gap-x-2 addon-links">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Icon id="github" size={24} />
                  <span>Submit an Issue</span>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
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
          <p>
            Complete voting system with user authentication, comment threads,
            status tracking, and admin dashboard. Users can submit ideas, vote
            on favorites, and track development progress.
          </p>

          <h2 className="subheading">Installation</h2>
          <pre>
            <code>Some code</code>
          </pre>

          <h2 className="subheading">Usage</h2>
          <p>
            Sunt ad dolor occaecat ut occaecat sint aliquip ea ullamco proident
            culpa exercitation deserunt dolor Lorem. Officia ut laborum esse
            commodo ut minim labore. Ad dolor elit sint non id exercitation.
            Velit esse qui officia exercitation.
          </p>

          <p>
            Commodo quis aliquip ea sint cupidatat eiusmod ea ut reprehenderit.
            Aliqua non laboris ut. Qui anim adipisicing reprehenderit in velit
            consectetur aute cupidatat nulla sunt. Ipsum ex dolore excepteur
            mollit tempor ad sunt ipsum ea qui. Do excepteur labore eu irure
            exercitation. Do dolor ut incididunt et ex tempor aliqua ea officia
            est commodo proident.
          </p>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/2egEM4qboEA?si=JLPMTHLFqCgg-hu_"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <h2 className="subheading">Manual Installation</h2>
          <p>
            Sunt ad dolor occaecat ut occaecat sint aliquip ea ullamco proident
            culpa exercitation deserunt dolor Lorem. Officia ut laborum esse
            commodo ut minim labore. Ad dolor elit sint non id exercitation.
            Velit esse qui officia exercitation.
          </p>
        </div>
      </div>
      <AdminBar
        hideAddOnControls={false}
        user={ctx.user}
        defaultExpanded={ctx.user?.isAdminBarShowing}
      />
    </InteriorLayout>
  );
};

export { AddonPage };

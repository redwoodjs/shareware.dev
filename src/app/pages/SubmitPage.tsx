import { InteriorLayout } from "../layouts/InteriorLayout";
import { link } from "../shared/links";

const SubmitPage = () => {
  return (
    <InteriorLayout>
      <div className="half-grid">
        <div className="half-grid--left pr-10">
          <h1 className="page-title">Submit Your Add On</h1>
          <h2 className="subheading mb-4">
            Help Build the RedwoodSDK Ecosystem
          </h2>
          <p className="text-xl leading-normal">
            Got a useful RedwoodSDK component or integration? Let's get it in
            front of other developers.
          </p>
          <p className="text-xl leading-normal mb-8">
            The best developer tools come from the community. If you've built
            something that makes RedwoodSDK development easier, faster, or more
            enjoyable, we want to help you share it.
          </p>

          <h2 className="subheading">How it Works</h2>
          <ol>
            <li>
              Sunt ad dolor occaecat ut occaecat sint aliquip ea ullamco
              proident culpa exercitation deserunt dolor Lorem. Officia ut
              laborum esse commodo ut minim labore. Ad dolor elit sint non id
              exercitation. Velit esse qui officia exercitation.
            </li>
            <li>
              Commodo quis aliquip ea sint cupidatat eiusmod ea ut
              reprehenderit. Aliqua non laboris ut. Qui anim adipisicing
              reprehenderit in velit consectetur aute cupidatat nulla sunt.
              Ipsum ex dolore excepteur mollit tempor ad sunt ipsum ea qui. Do
              excepteur labore eu irure exercitation. Do dolor ut incididunt et
              ex tempor aliqua ea officia est commodo proident.
            </li>

            <li>
              Complete voting system with user authentication, comment threads,
              status tracking, and admin dashboard. Users can submit ideas, vote
              on favorites, and track development progress.
            </li>
          </ol>
        </div>
        <div className="half-grid--right pt-[100px]">
          <form>
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="githubUrl">GitHub Repository URL</label>
              <input type="url" id="githubUrl" />
            </div>
            <div className="field">
              <label htmlFor="addonName">Add On Package Name</label>
              <input type="text" id="addonName" />
            </div>
            <div className="field">
              <label htmlFor="demoUrl">URL of Demo</label>
              <input type="url" id="demoUrl" />
            </div>
            <div className="field">
              <label htmlFor="briefDescription">Brief Description</label>
              <textarea id="briefDescription" />
            </div>
            <div className="field">
              <label htmlFor="category">Category</label>
              <select id="category">
                <option value="authentication">Authentication</option>
                <option value="database">Database</option>
                <option value="ui">UI</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="field flex items-start gap-2 accept-terms mb-10">
              <div>
                <input type="checkbox" id="terms" />
              </div>
              <p className="relative leading-normal">
                I've read and accept RedwoodSDK's{" "}
                <a href={link("/legal/:slug", { slug: "guidelines" })}>
                  Add-On Guidelines
                </a>{" "}
                and{" "}
                <a href={link("/legal/:slug", { slug: "guidelines" })}>
                  Community Guidelines.
                </a>
              </p>
            </div>
            <div className="button-group justify-start">
              <button type="submit" className="button primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </InteriorLayout>
  );
};

export { SubmitPage };

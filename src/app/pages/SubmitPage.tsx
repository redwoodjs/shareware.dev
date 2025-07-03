import { db } from "@/db";
import { AddOnForm } from "../components/AddOnForm";
import { AdminBar } from "../components/AdminBar";
import { link } from "../shared/links";
import { RequestInfo } from "rwsdk/worker";

const SubmitPage = async ({ ctx }: RequestInfo) => {
  // get all the categories
  const categories = await db.category.findMany();

  return (
    <>
      <div className="half-grid">
        <div className="half-grid--left pr-10 content">
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

          <h2 className="subheading !mb-4">How it Works</h2>
          <ol className="how-it-works">
            <li>
              <p>
                <strong>Fill Out the Form</strong>
                <br />
                Tell us about your add-on—what it does, how to install it, and
                where the code lives (e.g. GitHub link). Before you submit, make
                sure you’ve read our <a href="#">
                  Code Style Guidelines
                </a> and <a href="#">Community Guidelines.</a>
              </p>
            </li>
            <li>
              <p>
                <strong>We'll Review It</strong>
                <br />
                The RedwoodJS team checks for clarity, installability, and
                usefulness. We may follow up with questions or suggestions.
              </p>
            </li>
            <li>
              <p>
                <strong>Get Listed</strong>
                <br />
                Once approved, your add-on will be published to the
                Shareware.dev directory for others to discover and use.
              </p>
            </li>
          </ol>
        </div>
        <div className="half-grid--right pt-[100px]">
          <AddOnForm categories={categories} />
        </div>
      </div>
      <AdminBar user={ctx.user} hideAddOnControls={true} />
    </>
  );
};

export { SubmitPage };

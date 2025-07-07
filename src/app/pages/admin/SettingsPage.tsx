import { RequestInfo } from "rwsdk/worker";
import { UserAccountForm } from "./components/UserAccountForm";
import { db } from "@/db";

const SettingsPage = async ({ ctx }: RequestInfo) => {
  // get all the user's details
  const user = await db.user.findUnique({
    where: {
      id: ctx.user?.id,
    },
  });

  if (!user) {
    window.location.href = "/login";
    return;
  }

  return (
    <>
      <div className="pt-8">
        {/* heading */}
        <div className="mb-8">
          <h2 className="subheading mb-0">Account Settings</h2>
        </div>

        {/* Form */}
        <UserAccountForm user={user} />
      </div>
    </>
  );
};

export { SettingsPage };

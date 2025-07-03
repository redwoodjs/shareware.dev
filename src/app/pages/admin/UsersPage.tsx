import { AdminLayout } from "@/app/layouts/AdminLayout";
import { UserTable } from "./components/UserTable";
import { NewUserButton } from "./components/NewUserButton";
import { UserWithRole } from "@/worker";
import { RequestInfo } from "rwsdk/worker";
import { db } from "@/db";

const UsersPage = async ({ ctx }: RequestInfo) => {
  // get all the users
  const users = await db.user.findMany({
    include: {
      role: true,
    },
  });

  // get all the roles
  const roles = await db.role.findMany();

  return (
    <>
      <div className="pt-8">
        {/* heading */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="subheading mb-0">Manage Users</h2>
          <div className="button-group">
            <NewUserButton roles={roles} />
          </div>
        </div>

        <UserTable users={users} roles={roles} />
      </div>
    </>
  );
};

export { UsersPage };

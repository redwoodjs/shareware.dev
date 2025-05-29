import { AdminLayout } from "@/app/layouts/AdminLayout";
import { link } from "@/app/shared/links";
import { UserTable } from "./components/UserTable";
import { NewUserButton } from "./components/NewUserButton";

const UsersPage = () => {
  return (
    <AdminLayout>
      <div className="pt-8">
        {/* heading */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="subheading mb-0">Manage Users</h2>
          <div className="button-group">
            <NewUserButton />
          </div>
        </div>

        <UserTable />
      </div>
    </AdminLayout>
  );
};

export { UsersPage };

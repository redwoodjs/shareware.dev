import { AdminLayout } from "@/app/layouts/AdminLayout";
import { link } from "@/app/shared/links";
import { AddOnTable } from "./components/AddOnTable";
import { NewAddOnButton } from "./components/NewAddOnButton";
import { RequestInfo } from "rwsdk/worker";
import { UserWithRole } from "@/worker";

const DashboardPage = ({ ctx }: RequestInfo) => {
  return (
    <AdminLayout user={ctx.user as UserWithRole}>
      <div className="pt-8">
        {/* heading */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="subheading mb-0">Manage Add Ons</h2>
          <div className="button-group">
            <a href={`${link("/admin/")}?status=pending`} className="button">
              Pending
            </a>
            <a href={`${link("/admin/")}?status=archived`} className="button">
              Archived
            </a>
            <a href={`${link("/admin/")}?status=approved`} className="button">
              Approved
            </a>
            <NewAddOnButton />
          </div>
        </div>

        <AddOnTable />
      </div>
    </AdminLayout>
  );
};

export { DashboardPage };

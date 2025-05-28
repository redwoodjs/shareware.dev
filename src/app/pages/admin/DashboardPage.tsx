import { AdminLayout } from "@/app/layouts/AdminLayout";
import { link } from "@/app/shared/links";
import { AddOnRow } from "./components/AddOnRow";

const DashboardPage = () => {
  return (
    <AdminLayout>
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
          </div>
        </div>

        {/* table */}
        <div className="admin-addons-table">
          {/* table header */}
          <div></div>
          <div>Name</div>
          <div>Repo</div>
          <div>Tags</div>
          <div></div>

          {/* table body */}
          <AddOnRow />
          <AddOnRow />
          <AddOnRow />
        </div>
      </div>
    </AdminLayout>
  );
};

export { DashboardPage };

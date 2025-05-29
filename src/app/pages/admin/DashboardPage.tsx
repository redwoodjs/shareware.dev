import { AdminLayout } from "@/app/layouts/AdminLayout";
import { link } from "@/app/shared/links";
import { AddOnTable } from "./components/AddOnTable";
import { NewAddOnButton } from "./components/NewAddOnButton";
import { RequestInfo } from "rwsdk/worker";
import { UserWithRole } from "@/worker";
import { db } from "@/db";
import { Prisma } from "@generated/prisma";

export type AddOnWithCategoryAndStatus = Prisma.AddOnGetPayload<{
  include: {
    category: true;
    status: true;
  };
}>;

const DashboardPage = async ({ ctx, request }: RequestInfo) => {
  // get the url from the headers
  const url = new URL(request.url);
  const status = url.searchParams.get("status");

  // get all the categories
  const categories = await db.category.findMany();

  // get all the add ons
  const addOns = await db.addOn.findMany({
    include: {
      category: true,
      status: true,
    },
    where: status
      ? {
          status: {
            name: status,
          },
        }
      : undefined,
  });

  return (
    <AdminLayout user={ctx.user as UserWithRole}>
      <div className="pt-8">
        {/* heading */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="subheading mb-0">Manage Add Ons</h2>
          <div className="button-group">
            <a
              href={link("/admin/")}
              className={`button ${
                status === null ? "bg-black text-white" : ""
              }`}
            >
              All
            </a>
            <a
              href={`${link("/admin/")}?status=pending`}
              className={`button ${
                status === "pending" ? "bg-black text-white" : ""
              }`}
            >
              Pending
            </a>
            <a
              href={`${link("/admin/")}?status=archived`}
              className={`button ${
                status === "archived" ? "bg-black text-white" : ""
              }`}
            >
              Archived
            </a>
            <a
              href={`${link("/admin/")}?status=approved`}
              className={`button ${
                status === "approved" ? "bg-black text-white" : ""
              }`}
            >
              Approved
            </a>
            <NewAddOnButton categories={categories} />
          </div>
        </div>

        {addOns.length > 0 ? (
          <AddOnTable addOns={addOns} categories={categories} />
        ) : (
          <div className="italic font-body text-sm">No add-ons found</div>
        )}
      </div>
    </AdminLayout>
  );
};

export { DashboardPage };

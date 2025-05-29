import { AdminLayout } from "@/app/layouts/AdminLayout";
import { UserWithRole } from "@/worker";
import { RequestInfo } from "rwsdk/worker";

const SettingsPage = ({ ctx }: RequestInfo) => {
  return (
    <AdminLayout user={ctx.user as UserWithRole}>SettingsPage</AdminLayout>
  );
};

export { SettingsPage };

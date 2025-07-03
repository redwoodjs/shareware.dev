import { index, layout, route } from "rwsdk/router";
import { UsersPage } from "./UsersPage";
import { DashboardPage } from "./DashboardPage";
import { SettingsPage } from "./SettingsPage";
import { isAdmin } from "@/app/lib/authHelpers";
import { AdminLayout } from "@/app/layouts/AdminLayout";

export const adminRoutes = layout(AdminLayout, [
  isAdmin,
  index([DashboardPage]),
  route("/users", [UsersPage]),
  route("/settings", [SettingsPage]),
]);

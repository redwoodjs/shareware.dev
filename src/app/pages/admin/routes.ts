import { index, route } from "rwsdk/router";
import { UsersPage } from "./UsersPage";
import { DashboardPage } from "./DashboardPage";
import { SettingsPage } from "./SettingsPage";

export const adminRoutes = [
  index([DashboardPage]),
  route("/users", [UsersPage]),
  route("/settings", [SettingsPage]),
];

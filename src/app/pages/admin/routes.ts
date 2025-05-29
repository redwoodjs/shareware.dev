import { index, route } from "rwsdk/router";
import { UsersPage } from "./UsersPage";
import { DashboardPage } from "./DashboardPage";
import { SettingsPage } from "./SettingsPage";
import { isAdmin } from "@/app/lib/authHelpers";

export const adminRoutes = [
  index([isAdmin, DashboardPage]),
  route("/users", [isAdmin, UsersPage]),
  route("/settings", [isAdmin, SettingsPage]),
];

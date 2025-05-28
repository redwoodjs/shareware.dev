import { defineLinks } from "rwsdk/router";

export const link = defineLinks([
  "/",
  "/login",
  "/logout",
  "/forgot",
  "/reset",
  "/signup",
  "/submit",
  "/addon/:slug",
  "/docs/:slug",
  "/legal/:slug",
  "/admin/",
  "/admin/users",
]);

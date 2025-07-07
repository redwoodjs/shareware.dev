import { AdminNav } from "../pages/admin/components/AdminNav";
import { Header } from "../components/Header";
import { Avatar } from "../components/Avatar";
import { link } from "../shared/links";
import { UserWithRole } from "@/worker";
import { Toaster } from "../components/Toaster";
import { LayoutProps } from "rwsdk/router";

const AdminLayout = ({ children, requestInfo }: LayoutProps) => {
  const user = requestInfo?.ctx?.user as UserWithRole;
  return (
    <div>
      <Toaster />
      <Header />
      <div className="grid grid-cols-[270px_1fr] min-h-[calc(100vh_-_75px)]">
        <div className="border-r-2 border-black">
          <div className="pt-10 pb-20 px-10 sticky top-0">
            <AdminNav />
          </div>
          {/* account bar */}
          <div className="py-5 px-10 flex gap-5 items-center border-t-2 border-black border-dashed fixed bottom-0 w-[268px]">
            <div className="flex-shrink-0">
              <a href={link("/admin/settings")}>
                <Avatar
                  src={user.avatar || ""}
                  alt={`${user.firstName} ${user.lastName}`}
                  size={56}
                />
              </a>
            </div>
            <div className="flex-1">
              <div className="font-chicago">
                <a
                  href={link("/admin/settings")}
                  className="hover:text-link-hover hover:underline"
                >
                  {user.firstName} {user.lastName}
                </a>
              </div>
              <div className="text-sm">
                <a
                  href={link("/logout")}
                  className="hover:text-link hover:underline"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="page-margin">{children}</div>
      </div>
    </div>
  );
};

export { AdminLayout };

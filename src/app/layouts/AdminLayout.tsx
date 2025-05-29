import { AdminNav } from "../pages/admin/components/AdminNav";
import { Header } from "../components/Header";
import { Avatar } from "../components/Avatar";
import { link } from "../shared/links";
import { Toaster } from "../components/Toaster";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-[270px_1fr] min-h-[calc(100vh_-_75px)]">
        <div className="border-r-2 border-black h-full flex flex-col justify-between">
          <div className="pt-10 pb-20 px-10">
            <AdminNav />
          </div>
          <div className="py-5 px-10 flex gap-5 items-center border-t-2 border-black border-dashed">
            <div className="flex-shrink-0">
              <a href={link("/admin/settings")}>
                <Avatar
                  src="/images/placeholder-avatar.png"
                  alt="John Doe"
                  size={56}
                />
              </a>
            </div>
            <div className="flex-1">
              <div className="font-chicago">
                <a
                  href={link("/admin/settings")}
                  className="hover:text-link hover:underline"
                >
                  John Doe
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
      <Toaster />
    </div>
  );
};

export { AdminLayout };

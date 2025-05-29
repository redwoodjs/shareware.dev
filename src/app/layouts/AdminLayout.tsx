import { AdminNav } from "../pages/admin/components/AdminNav";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-[270px_1fr] min-h-screen">
        <div className="border-r-2 border-black">
          <div className="sticky top-10 pt-10 pb-20 px-10">
            <AdminNav />
          </div>
        </div>
        <div className="page-margin">{children}</div>
      </div>
      <Footer condensed={true} />
    </div>
  );
};

export { AdminLayout };

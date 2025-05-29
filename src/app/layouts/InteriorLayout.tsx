import { AsideNav } from "../components/AsideNav";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
// import { Toaster } from "../components/Toaster";

const InteriorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <Toaster /> */}
      <Header />
      <div className="grid grid-cols-[270px_1fr]">
        <div className="border-r-2 border-black">
          <div className="sticky top-10 pt-10 pb-20 px-10">
            <AsideNav />
          </div>
        </div>
        <div className="page-margin">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export { InteriorLayout };

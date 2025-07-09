import { LayoutProps } from "rwsdk/router";
import { AsideNav } from "../components/AsideNav";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Toaster } from "../components/Toaster";
import { useCurrentPath } from "../lib/urlHelpers";

const InteriorLayout = ({ children, requestInfo }: LayoutProps) => {
  const currentUrl = requestInfo?.request.url;
  const currentPath = useCurrentPath(currentUrl ?? "");

  return (
    <div>
      <Toaster />
      <Header currentPath={currentPath} />
      <div className="grid md:grid-cols-[270px_1fr]">
        <div className="border-r-2 border-black">
          <div className="sticky top-10 pt-10 pb-20 px-10 hidden md:block">
            <AsideNav currentPath={currentPath} />
          </div>
        </div>
        <div className="pl-5 pr-12 md:pl-12">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export { InteriorLayout };

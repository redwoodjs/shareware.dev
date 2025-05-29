import { PropsWithChildren } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Toaster } from "../components/Toaster";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="bg-[#9fa0d0] min-h-[90vh] center py-5">
        <div className="bg-[#e0e0e0] border-1 border-white max-w-[600px] w-full p-10">
          {children}
        </div>
      </div>
      <Footer condensed={true} />
      <Toaster />
    </>
  );
};

export default AuthLayout;

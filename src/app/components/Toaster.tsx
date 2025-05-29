"use client";

import { Toaster as ToasterComponent } from "sonner";

const Toaster = () => {
  return (
    <>
      <ToasterComponent position="top-right" offset={{ top: "90px" }} />
    </>
  );
};

export { Toaster };

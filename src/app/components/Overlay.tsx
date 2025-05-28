"use client";

import { useEffect } from "react";

const Overlay = ({ className = "" }: { className?: string }) => {
  // prevent scrolling
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div
      className={`bg-black opacity-50 full-screen z-[var(--z-index-overlay)] ${
        className ? className : ""
      }`}
    ></div>
  );
};

export { Overlay };

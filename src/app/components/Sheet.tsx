"use client";

import { Overlay } from "./Overlay";

const Sheet = ({
  children,
  handleClose,
}: {
  children: React.ReactNode;
  handleClose: () => void;
}) => {
  return (
    <>
      <div className="bg-white w-[590px] h-screen overflow-y-auto px-[50px] pt-[80px] pb-[100px]">
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 border-3 border-black bg-white aspect-square size-6 hover:bg-black cursor-pointer"
        ></button>
        {children}
      </div>
    </>
  );
};

export { Sheet };

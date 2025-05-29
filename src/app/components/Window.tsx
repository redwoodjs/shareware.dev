"use client";

export const Window = ({
  closable = false,
  title,
  children,
  onClose = () => {},
}: {
  closable?: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  return (
    <div className="bg-white border-[4px] border-white outline-[4px] outline-black text-black w-[calc(100%_-_8px)] mx-auto">
      <header className="flex items-center gap-2 mb-0">
        {closable ? (
          <button
            className="size-6 border-[2px] border-black cursor-pointer hover:bg-black"
            onClick={onClose}
          ></button>
        ) : (
          <div className="size-6 border-[2px] border-black"></div>
        )}
        <div className="multiple-lines"></div>
        <h2 className="uppercase font-chicago">{title}</h2>
        <div className="multiple-lines"></div>
      </header>
      <div className="px-[2px] py-1">{children}</div>
    </div>
  );
};

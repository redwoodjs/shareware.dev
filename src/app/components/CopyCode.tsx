"use client";

import { useCopyToClipboard } from "captain-react-hooks";
import { useState } from "react";

export const CopyCode = ({ code }: { code: string }) => {
  const [copiedText, setCopiedText] = useState("COPY");
  const { copy } = useCopyToClipboard();

  const copyToClipboard = () => {
    copy(code);
    setCopiedText("COPIED");
    setTimeout(() => {
      setCopiedText("COPY");
    }, 2000);
  };

  return (
    <div className="bg-black font-chicago flex items-center gap-x-3 text-white text-lg h-20 px-5 outline-2 outline-black border-2 border-white">
      <div className="text-casablanca">&gt;</div>
      <input
        type="text"
        defaultValue={code}
        className="flex-1 outline-none focus:outline-none focus:border-none border-none"
      />
      <button
        role="button"
        className="relative cursor-pointer w-[75px] hover:text-casablanca ml-3"
        onClick={copyToClipboard}
      >
        {copiedText}
      </button>
    </div>
  );
};

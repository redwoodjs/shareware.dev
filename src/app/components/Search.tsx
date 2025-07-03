"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { useEscapeKey } from "captain-react-hooks";
import { Overlay } from "./Overlay";
import { Window } from "./Window";
import { SearchResultsRow } from "./SearchResultsRow";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEscapeKey(() => setIsOpen(false));

  useEffect(() => {
    // if the user types cmd + k, open the search screen
    const hitCommandK = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", hitCommandK);
    return () => {
      window.removeEventListener("keydown", hitCommandK);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="font-chicago flex items-center gap-1 border-2 border-black rounded-corners px-4 py-1 hover:bg-black hover:text-white cursor-pointer"
      >
        <Icon id="search" size={16} />
        ⌘K
      </button>
      {isOpen && (
        <>
          <Overlay />
          <div className="flex justify-center mt-[150px] full-screen z-[var(--z-index-window)]">
            <div className="max-w-[815px] w-full relative z-[var(--z-index-window)]">
              <Window title="Search" closable onClose={() => setIsOpen(false)}>
                <>
                  {/* form */}
                  <div className="flex items-center gap-4 p-4">
                    <img src="/images/computer-icon.png" alt="Computer Icon" />
                    <input type="text" placeholder="Keywords" />
                    <button className="button primary">Search</button>
                  </div>
                  {/* results */}
                  <div className="border-1 border-black py-3 px-4 flex flex-col gap-y-3 max-h-[500px] overflow-y-scroll">
                    <SearchResultsRow />
                  </div>
                </>
              </Window>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { Search };

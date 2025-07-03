"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { useEscapeKey } from "captain-react-hooks";
import { Overlay } from "./Overlay";
import { Window } from "./Window";
import { SearchResultsRow } from "./SearchResultsRow";
import { AddOnWithCategory } from "./Nav";
import { link } from "../shared/links";

const Search = ({ addOns }: { addOns: AddOnWithCategory[] }) => {
  const [addOnResults, setAddOnResults] = useState<AddOnWithCategory[]>(addOns);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEscapeKey(() => setIsOpen(false));

  // as soon as the component loads, focus the search input
  useEffect(() => {
    searchInputRef.current?.focus();
  }, [isOpen]);

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

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(-1);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) => (prev < addOns.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : addOns.length - 1));
          break;
        case "Enter":
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < addOns.length) {
            const selectedAddon = addOns[selectedIndex];
            window.location.href = link("/addon/:slug", {
              slug: selectedAddon.id,
            });
            setIsOpen(false);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, addOns.length, selectedIndex, addOns]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const results = addOns.filter((addOn) =>
      addOn.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAddOnResults(results);
  };

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
                    <input
                      type="text"
                      id="search"
                      name="search"
                      placeholder="Keywords"
                      ref={searchInputRef}
                      onChange={handleSearch}
                    />
                    <button className="button primary">Search</button>
                  </div>
                  {/* results */}
                  <div className="border-1 border-black py-3 px-4 flex flex-col gap-y-1 max-h-[500px] overflow-y-scroll">
                    {addOnResults.map((addOn, index) => (
                      <SearchResultsRow
                        key={addOn.id}
                        addOn={addOn}
                        isSelected={index === selectedIndex}
                      />
                    ))}
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

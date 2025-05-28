"use client";

import { Icon } from "@/app/components/Icon";
import { Dropdown } from "./Dropdown";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<"sun" | "moon" | "desktop">("sun");

  return (
    <div className="relative">
      <button onClick={() => setOpen((prevValue) => !prevValue)}>
        <Icon id={selected} size={32} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="absolute top-0 top-10 -right-5 w-[225px]">
            <Dropdown
              callback={() => setOpen(false)}
              options={[
                {
                  label: "Light Mode",
                  icon: "sun",
                  handleClick: () => {
                    setSelected("sun");
                  },
                  selected: selected === "sun",
                },
                {
                  label: "Dark Mode",
                  icon: "moon",
                  handleClick: () => {
                    setSelected("moon");
                  },
                  selected: selected === "moon",
                },
                {
                  label: "System",
                  icon: "desktop",
                  handleClick: () => {
                    setSelected("desktop");
                  },
                  selected: selected === "desktop",
                },
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ThemeSwitcher };

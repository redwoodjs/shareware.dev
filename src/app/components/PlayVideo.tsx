"use client";

import { useRef, useState } from "react";
import { Overlay } from "./Overlay";
import { Window } from "./Window";
import { useEscapeKey, useOutsideClick } from "captain-react-hooks";

const PlayVideo = () => {
  const [isShowing, setIsShowing] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  useOutsideClick(() => setIsShowing(false), overlayRef);

  useEscapeKey(() => setIsShowing(false));

  return (
    <>
      <button
        onClick={() => setIsShowing(true)}
        className="border-[4px] border-black flex vertical-center hover:bg-black hover:text-white cursor-pointer"
      >
        <div className="center aspect-square h-[74px]">
          <svg
            width="31"
            height="39"
            viewBox="0 0 31 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.0833 19.5208L0.0998146 0.420998V38.6206L31.0833 19.5208Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="flex-1 border-l-[3px] border-black p-4 text-left pr-6">
          <div className="font-chicago">See What's Possible</div>
          <div>45 seconds</div>
        </div>
      </button>

      {isShowing && (
        <>
          <Overlay />
          <div className="full-screen center z-[var(--z-index-window)]">
            <div className="w-[800px]" ref={overlayRef}>
              <Window
                title="See What's Possible"
                closable
                onClose={() => setIsShowing(false)}
              >
                <div className="aspect-video w-full h-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/2egEM4qboEA?si=JLPMTHLFqCgg-hu_"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </Window>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { PlayVideo };

import { constants } from "@/app/lib/constants";
import { link } from "../shared/links";
import { Newsletter } from "./Newsletter";

const Footer = ({ condensed = false }: { condensed?: boolean }) => {
  return (
    <footer className="bg-black text-white">
      {!condensed && (
        <div className="max-w-[815px] mx-auto mb-20">
          <Newsletter />
        </div>
      )}
      <ul className="social-media mb-12 page-mobile md:page-margin">
        <li>
          <a href={constants.GITHUB} target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
        </li>
        <li>
          <a
            href={constants.LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
          </a>
        </li>
        <li>
          <a href={constants.YOUTUBE} target="_blank" rel="noopener noreferrer">
            YOUTUBE
          </a>
        </li>
        <li>
          <a href={constants.BLUESKY} target="_blank" rel="noopener noreferrer">
            BLUESKY
          </a>
        </li>
        <li>
          <a href={constants.DISCORD} target="_blank" rel="noopener noreferrer">
            DISCORD
          </a>
        </li>
      </ul>
      <p className="font-chicago text-white flex-wrap center mb-9 md:mb-5 whitespace-wrap page-mobile md:page-margin">
        Copyright &copy; {new Date().getFullYear()}.&nbsp;
        <a
          href={constants.REDWOODJS}
          rel="noopener noreferrer"
          className="text-white hover:text-casablanca"
        >
          RedwoodJS, Inc.
        </a>
        &nbsp;All Rights Reserved.
      </p>
      <ul className="page-mobile md:page-margin">
        <li>
          <a href={link("/legal/:slug", { slug: "terms" })}>
            Terms and Conditions
          </a>
        </li>
        <li>
          <a href={link("/legal/:slug", { slug: "privacy" })}>Privacy Policy</a>
        </li>
        <li>
          <a href={link("/legal/:slug", { slug: "disclaimers" })}>
            Disclaimers
          </a>
        </li>
        <li>
          <a href={link("/legal/:slug", { slug: "license" })}>MIT License</a>
        </li>
      </ul>
    </footer>
  );
};

export { Footer };

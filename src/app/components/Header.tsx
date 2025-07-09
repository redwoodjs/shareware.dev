import { db } from "@/db";
import { link } from "../shared/links";
import { MobileNav } from "./MobileNav";
import { Nav } from "./Nav";
import { allDocs } from "content-collections";

const Header = async () => {
  // get all the approved add ons
  const addOns = await db.addOn.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      status: {
        name: "approved",
      },
    },
  });

  const allDocLinks = allDocs.map((doc) => {
    return {
      slug: doc.slug,
      title: doc.title,
    };
  });

  return (
    <div className="flex justify-between items-center px-10 py-4 border-b-3 border-black">
      <a href={link("/")}>
        <img
          src="/images/sdk-logo.svg"
          alt="RedwoodSDK"
          className="h-10 relative"
        />
      </a>
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className="md:hidden">
        <MobileNav addOns={addOns} allDocLinks={allDocLinks} />
      </div>
    </div>
  );
};

export { Header };

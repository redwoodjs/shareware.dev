import { RequestInfo } from "rwsdk/worker";
import { Footer } from "../components/Footer";
import { PlayVideo } from "../components/PlayVideo";
import { Nav } from "../components/Nav";
import { AddOnRow } from "../components/AddOnRow";
import { Faq } from "../components/Faq";
import { AdminBar } from "../components/AdminBar";
import { Toaster } from "../components/Toaster";
import { db } from "@/db";
import { allFaqs } from "content-collections";
import type { Faq as FaqType } from "content-collections";

const HomePage = async ({ ctx }: RequestInfo) => {
  // get all the featured add ons
  const featuredAddOns = await db.addOn.findMany({
    where: {
      featured: true,
      status: {
        name: "approved",
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  // split the faqs into two columns
  const faqs = allFaqs.reduce(
    (acc: { left: FaqType[]; right: FaqType[] }, faq, index) => {
      const column = index % 2 === 0 ? "left" : "right";
      acc[column].push(faq as FaqType);
      return acc;
    },
    { left: [] as FaqType[], right: [] as FaqType[] }
  );

  return (
    <div>
      {/* hero */}
      <div className="grid grid-cols-[auto_1fr] gap-x-12 w-screen bg-[#ebe6e5]">
        <div className="flex items-baseline justify-start h-full">
          <img
            src="/images/hero.png"
            alt="Hero"
            srcSet="/images/hero.png 1x, /images/hero@2x.png 2x"
            className="vertical-center mt-auto mr-auto"
          />
        </div>
        <div>
          <div className="px-10 py-4 flex justify-end mb-10">
            <Nav />
          </div>
          <div className="max-w-[575px] mb-10">
            <img
              src="/images/sdk-logo.svg"
              alt="RedwoodSDK"
              className="mb-10"
            />
            <h1 className="font-serif text-[145px] leading-[162px] mb-[22px]">
              Add Ons
            </h1>
            <h2 className="font-serif text-[36px] leading-[50px] mb-4">
              Add powerful features to your application with a single command.
            </h2>
            <p className="text-lg leading-[28px] mb-[32px]">
              RedwoodSDK Add Ons are pre-built, production-ready components, and
              applications that install with a single command. Focus on what
              makes your app unique.
            </p>
            <PlayVideo />
          </div>
        </div>
      </div>

      <div className="bg-[url('/images/separator.svg')] bg-repeat-x h-[35px] bg-center"></div>

      {/* add-on list */}
      {featuredAddOns && (
        <section className="flex flex-col gap-[140px] pt-[100px] page-width mb-[100px]">
          {featuredAddOns.map((addon) => (
            <AddOnRow key={addon.id} addon={addon} />
          ))}
        </section>
      )}

      {/* frequently asked questions */}
      <section className="page-margin mb-[120px]">
        <div className="grid grid-cols-2 gap-x-[50px]">
          <div className="col-span-2">
            <h2 className="subheading mb-8">Frequently Asked Questions</h2>
          </div>
          {/* left column */}
          <div className="faq-list">
            {faqs.left.map((faq, index) => (
              <Faq question={faq.question} key={`${index}-left`}>
                <div dangerouslySetInnerHTML={{ __html: faq.html }} />
              </Faq>
            ))}
          </div>
          {/* right column */}
          <div className="faq-list">
            {faqs.right.map((faq, index) => (
              <Faq question={faq.question} key={`${index}-right`}>
                <div dangerouslySetInnerHTML={{ __html: faq.html }} />
              </Faq>
            ))}
          </div>
        </div>
      </section>

      <AdminBar hideAddOnControls={true} user={ctx.user} />
      <Footer />
      <Toaster />
    </div>
  );
};

export { HomePage };

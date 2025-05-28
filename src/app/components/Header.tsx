import { link } from "../shared/links";
import { Nav } from "./Nav";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-10 py-4 border-b-3 border-black">
      <a href={link("/")}>
        <img src="/images/sdk-logo.svg" alt="RedwoodSDK" className="h-10" />
      </a>
      <Nav />
    </div>
  );
};

export { Header };

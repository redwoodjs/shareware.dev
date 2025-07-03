import { Avatar, AvatarProps } from "./Avatar";

const CreditWrapper = ({
  link,
  children,
}: {
  link: string;
  children: React.ReactNode;
}) => {
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-link hover:underline"
      >
        {children}
      </a>
    );
  }
  return <>{children}</>;
};

const Credit = ({
  avatar,
  link = "",
  owner,
  repo,
}: {
  avatar: AvatarProps;
  owner: string;
  repo: string;
  link?: string;
}) => {
  return (
    <CreditWrapper link={link}>
      <div className="flex items-center gap-x-2">
        <Avatar {...avatar} />
        <div className="text-sm font-chicago whitespace-nowrap truncate">
          <span>{owner}</span>
          <span> / </span>
          <span>{repo}</span>
        </div>
      </div>
    </CreditWrapper>
  );
};

export { Credit };

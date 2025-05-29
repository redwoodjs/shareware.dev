export type BadgeStatus = "archived" | "pending" | "featured" | "approved";

const Badge = ({
  className = "",
  label,
  status,
}: {
  className?: string;
  label: string;
  status?: "" | BadgeStatus;
}) => {
  return (
    <div
      className={`rounded-corners font-chicago text-xs px-2 py-1 inline-block capitalize ${
        status ? `tag-${status}` : "bg-casablanca text-black"
      } ${className ? className : ""}`}
    >
      {label}
    </div>
  );
};

export { Badge };

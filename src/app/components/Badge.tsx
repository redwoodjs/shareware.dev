const Badge = ({
  className = "",
  label,
  status,
}: {
  className?: string;
  label: string;
  status?: "" | "archived" | "pending" | "featured" | "approved";
}) => {
  return (
    <div
      className={`rounded-corners font-chicago text-xs px-2 py-1 inline-block ${
        status ? `tag-${status}` : "bg-casablanca text-black"
      } ${className ? className : ""}`}
    >
      {label}
    </div>
  );
};

export { Badge };

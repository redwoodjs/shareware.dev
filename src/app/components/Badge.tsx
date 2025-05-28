const Badge = ({
  label,
  status,
}: {
  label: string;
  status?: "" | "archived" | "pending" | "featured" | "approved";
}) => {
  return (
    <div
      className={`rounded-corners font-chicago text-xs px-2 py-1 inline-block ${
        status ? `tag-${status}` : "bg-casablanca text-black"
      }`}
    >
      {label}
    </div>
  );
};

export { Badge };

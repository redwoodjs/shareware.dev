const Toggle = ({
  name,
  value,
  defaultChecked,
  label,
}: {
  name: string;
  value: string;
  defaultChecked: boolean;
  label: string;
}) => {
  return (
    <div className="toggle-button flex items-center gap-2">
      <input
        type="checkbox"
        id={name}
        className="sr-only"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={name}>
        <div className="switch"></div>
        {label}
      </label>
    </div>
  );
};

export { Toggle };

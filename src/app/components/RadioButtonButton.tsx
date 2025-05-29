import { IconName } from "../../../types/icons";
import { Icon } from "./Icon";

const RadioButtonButton = ({
  name,
  value,
  label,
  icon = null,
  className = "",
  defaultChecked = false,
}: {
  name: string;
  value: string;
  label: string;
  icon?: IconName | null;
  className?: string;
  defaultChecked?: boolean;
}) => {
  return (
    <label
      className={`radio-button-button button center gap-2 ${
        className ? className : ""
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        className="sr-only"
        defaultChecked={defaultChecked}
      />
      {icon && <Icon id={icon} />}
      {label}
    </label>
  );
};

export { RadioButtonButton };

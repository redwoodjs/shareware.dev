import { IconName } from "../../../types/icons";

interface Props {
  size?: number;
  id: IconName;
  className?: string;
}

const Icon = ({ className, size = 24, id }: Props) => {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`/images/icons/sprite.svg#${id}`}></use>
    </svg>
  );
};

export { Icon };

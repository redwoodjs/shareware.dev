export interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
}

const Avatar = ({ src = "", alt, size = 32 }: AvatarProps) => {
  if (!src) {
    return (
      <div
        className="rounded-full bg-link center"
        style={{ width: size, height: size }}
      >
        <span className="text-white font-chicago uppercase">
          {alt.charAt(0)}
        </span>
      </div>
    );
  }
  return (
    <div>
      <img
        src={src}
        alt={alt}
        style={{ width: size, height: size }}
        className="rounded-full"
      />
    </div>
  );
};

export { Avatar };

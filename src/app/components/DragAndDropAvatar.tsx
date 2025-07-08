"use client";

import { useState, useRef } from "react";
import { Icon } from "./Icon";
import { toast } from "sonner";
import { uploadAvatar } from "@/app/pages/admin/actions";

type DragAndDropAvatarProps = {
  name: string;
  userId: string;
  defaultValue?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DragAndDropAvatar = ({
  name,
  userId,
  defaultValue = "",
  ...rest
}: DragAndDropAvatarProps) => {
  const [file, setFile] = useState<string>(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFile(droppedFiles[0].name);

    const dataTransfer = new DataTransfer();
    droppedFiles.forEach((file) => dataTransfer.items.add(file));
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const updateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("updateAvatar");
    const file = e.target.files?.[0];
    if (file) {
      // upload image
      const result = await uploadAvatar(userId, file);
      if (result.error) {
        toast.error(result.error);
      } else {
        setFile(result.avatar ?? "");
        toast.success("Avatar updated successfully");
      }
    }
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${
        isDragging ? "border-link-hover" : "border-link"
      } rounded-full center text-white bg-black hover:bg-link aspect-square text-center cursor-pointer`}
    >
      <div className="size-full relative center">
        {!file ? (
          <>
            <input
              type="file"
              name={name}
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                updateAvatar(e);
              }}
              accept="image/*"
              multiple={false}
              {...rest}
            />
            <div className="flex items-center gap-2">
              Upload
              <br />
              an Avatar
            </div>
          </>
        ) : (
          <>
            {file && (
              <img
                src={file}
                alt={file}
                className="size-full object-cover rounded-full"
              />
            )}
            <button
              role="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFile("");
              }}
              className="absolute top-3 right-3 bg-red-500 text-white border-none rounded-full cursor-pointer"
            >
              <Icon id="close" />
            </button>
          </>
        )}
      </div>
    </label>
  );
};

export { DragAndDropAvatar };

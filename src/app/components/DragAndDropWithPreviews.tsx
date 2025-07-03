"use client";

import { useState, useRef } from "react";
import { Icon } from "./Icon";

const DragAndDropWithPreviews = ({ name }: { name: string }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createPreviews = (newFiles: File[]) => {
    const newPreviews: string[] = [];

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

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
    setFiles(droppedFiles);
    createPreviews(droppedFiles);

    const dataTransfer = new DataTransfer();
    droppedFiles.forEach((file) => dataTransfer.items.add(file));
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${
        isDragging ? "border-link" : "border-black"
      } border-black border-[2.5px] border-dashed min-h-[60px] py-4 px-3 flex items-center gap-2 font-sans normal-case cursor-pointer`}
    >
      <div>
        <input
          type="file"
          name={name}
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple={true}
          onChange={(e) => {
            if (e.target.files) {
              const newFiles = Array.from(e.target.files);
              setFiles(newFiles);
              createPreviews(newFiles);
            }
          }}
        />
        <div className="flex items-center gap-2">
          <Icon id="upload" />
          <strong>Choose File</strong> or <strong>Drag and Drop</strong>
        </div>
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {files.map((file, index) => (
              <div key={file.name} style={{ position: "relative" }}>
                {previews[index] && (
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="max-w-[200px] max-h-[200px] object-cover"
                  />
                )}
                <button
                  role="button"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFiles(files.filter((_, i) => i !== index));
                    setPreviews(previews.filter((_, i) => i !== index));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white border-none rounded-full size-5 cursor-pointer"
                >
                  <Icon id="close" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </label>
  );
};

export { DragAndDropWithPreviews };

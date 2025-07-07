"use client";

import { Category } from "@generated/prisma";
import { link } from "../shared/links";
import { submitAddOn } from "../pages/actions";
import { toast } from "sonner";
import { Icon } from "./Icon";
import { DragAndDropWithPreviews } from "./DragAndDropWithPreviews";

const AddOnForm = ({ categories }: { categories: Category[] }) => {
  const handleSubmit = async (formData: FormData) => {
    console.log(formData);
    const response = await submitAddOn(formData);
    if (response.error) {
      console.error(response.error);
      toast.error(response.error);
    } else {
      // TODO: Reset form
      toast.success("Add-On submitted successfully");
    }
  };

  return (
    <form action={handleSubmit} encType="multipart/form-data">
      <div className="field">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" />
      </div>
      <div className="field">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className="field">
        <label htmlFor="githubRepo">GitHub Repository URL</label>
        <input type="url" id="githubRepo" name="githubRepo" />
      </div>
      <div className="field">
        <label htmlFor="addonName">Add On Package Name</label>
        <input type="text" id="addonName" name="addonName" />
      </div>
      <div className="field">
        <label htmlFor="demoUrl">URL of Demo</label>
        <input type="url" id="demoUrl" name="demoUrl" />
      </div>
      <div className="field">
        <label>Cover Image</label>
        <DragAndDropWithPreviews
          name="coverImage"
          accept="image/*"
          multiple={false}
        />
        <p className="text-xs">Recommended size: 1024x512</p>
      </div>
      <div className="field">
        <label htmlFor="briefDescription">Brief Description</label>
        <textarea id="briefDescription" name="briefDescription" />
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" name="category">
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field flex items-start gap-2 accept-terms mb-10">
        <div>
          <input type="checkbox" id="terms" name="terms" />
        </div>
        <p className="relative leading-normal">
          I've read and accept RedwoodSDK's Add-On{" "}
          <a href={link("/legal/:slug", { slug: "code" })}>
            Code Style Guidelines
          </a>{" "}
          and{" "}
          <a href={link("/legal/:slug", { slug: "community" })}>
            Community Guidelines.
          </a>
        </p>
      </div>
      <div className="button-group justify-start">
        <button type="submit" className="button primary" role="button">
          Submit
        </button>
      </div>
    </form>
  );
};

export { AddOnForm };

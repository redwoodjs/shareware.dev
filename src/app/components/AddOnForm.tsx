"use client";

import { Category } from "@generated/prisma";
import { link } from "../shared/links";
import { submitAddOn } from "../pages/actions";
import { toast } from "sonner";
import { DragAndDropWithPreviews } from "./DragAndDropWithPreviews";
import { RequiredField } from "./RequiredField";

const AddOnForm = ({ categories }: { categories: Category[] }) => {
  const handleSubmit = async (formData: FormData) => {
    const response = await submitAddOn(formData);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Add-On submitted successfully");
    }
  };

  return (
    <form action={handleSubmit} encType="multipart/form-data">
      <div className="field">
        <label htmlFor="firstName">
          First Name <RequiredField />
        </label>
        <input type="text" id="firstName" name="firstName" required />
      </div>
      <div className="field">
        <label htmlFor="lastName">
          Last Name <RequiredField />
        </label>
        <input type="text" id="lastName" name="lastName" required />
      </div>
      <div className="field">
        <label htmlFor="email">
          Email <RequiredField />
        </label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="field">
        <label htmlFor="githubRepo">
          GitHub Repository URL <RequiredField />
        </label>
        <input
          type="url"
          id="githubRepo"
          name="githubRepo"
          placeholder="https://github.com/"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="addonName">
          Add On Package Name <RequiredField />
        </label>
        <input type="text" id="addonName" name="addonName" required />
      </div>
      <div className="field">
        <label htmlFor="demoUrl">URL of Demo</label>
        <input type="url" id="demoUrl" name="demoUrl" placeholder="https://" />
      </div>
      <div className="field">
        <label>
          Cover Image <RequiredField />
        </label>
        <DragAndDropWithPreviews
          name="coverImage"
          accept="image/*"
          multiple={false}
          required
        />
        <p className="text-xs">Recommended size: 1024x512</p>
      </div>
      <div className="field">
        <label htmlFor="briefDescription">
          Brief Description <RequiredField />
        </label>
        <textarea id="briefDescription" name="briefDescription" required />
      </div>
      <div className="field">
        <label htmlFor="category">
          Category <RequiredField />
        </label>
        <select id="category" name="category" required>
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
          <input type="checkbox" id="terms" name="terms" required />
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

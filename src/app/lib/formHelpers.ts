import { slugify } from "./urlHelpers";
import { env } from "cloudflare:workers";

/**
 * validate the passwords match
 * @param newPassword - the new password
 * @param confirmPassword - the confirm password
 * @returns boolean - true if the passwords match, false otherwise
 */
export const validatePassswordsMatch = (
  newPassword: string,
  confirmPassword: string
): boolean => {
  return newPassword === confirmPassword;
};

/**
 * determines whether all the fields in the form are filled out
 * @param formFieldArray - an array of strings representing the form fields
 * @returns boolean - true if all the fields are filled out, false otherwise
 */
export const validateRequiredFields = (formFieldArray: string[]): boolean => {
  for (const field of formFieldArray) {
    if (field === "") {
      return false;
    }
  }
  return true;
};

/**
 * determines whether the given email address is valid
 * @param string email address
 * @return boolean - true if the email address is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  return email.includes("@") && email.includes(".");
};

/**
 * validate the GitHub Repo by ensuring the URL includes github.com
 * @param githubRepo - the GitHub Repo URL
 * @returns boolean - true if the GitHub Repo is valid, false otherwise
 */
export const validateGitHubRepo = (githubRepo: string): boolean => {
  if (!githubRepo) {
    return false;
  }

  // validate the repo - ensure the URL includes github.com
  if (!githubRepo.includes("github.com")) {
    return false;
  }

  return true;
};

/**
 * get the owner and repo from the GitHub Repo URL
 * @param githubRepo - the GitHub Repo URL
 * @returns { owner: string, repo: string } - the owner and repo
 */
export const getOwnerAndRepo = (githubRepo: string) => {
  const [owner, repo] = githubRepo.split("/").slice(-2);

  // check to make sure the owner and repo are valid and one of the values is NOT github and the other is not empty
  if (owner === "github" || repo === "github" || !owner || !repo) {
    return { error: "Invalid github repo" };
  }

  return { owner, repo };
};

/**
 * upload the image to R2
 * @param file - the file to upload
 * @returns the R2 object key
 */
export const uploadImageToR2 = async (file: File): Promise<string> => {
  const timestamp = Date.now();
  console.log("filename", file.name);
  const r2ObjectKey = `/storage/${timestamp}-${file.name}`;
  console.log("r2ObjectKey", r2ObjectKey);
  await env.R2.put(r2ObjectKey, file.stream(), {
    httpMetadata: {
      contentType: file.type,
    },
  });
  return r2ObjectKey;
};

/**
 * delete the image from R2
 * @param r2ObjectKey - the R2 object key
 */
export const deleteImageFromR2 = async (r2ObjectKey: string) => {
  await env.R2.delete(r2ObjectKey);
};

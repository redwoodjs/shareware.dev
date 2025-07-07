export const validatePassswordsMatch = (newPassword, confirmPassword) => {
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

export const validateGitHubRepo = (githubRepo: string): boolean => {
  if (!githubRepo) {
    return false;
  }

  /**
   * Validate the repo - Ensure the URL includes github.com
   */
  if (!githubRepo.includes("github.com")) {
    return false;
  }

  return true;
};

const getOwnerAndRepo = (githubRepo: string) => {
  const [owner, repo] = githubRepo.split("/").slice(-2);

  // check to make sure the owner and repo are valid and one of the values is NOT github and the other is not empty
  if (owner === "github" || repo === "github" || !owner || !repo) {
    return { error: "Invalid github repo" };
  }

  return { owner, repo };
};

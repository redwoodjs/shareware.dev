"use server";

import { db } from "@/db";

export const addUser = async (formData: FormData) => {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    // generate a random password - this will get reset when the user verifies their account
    const password = crypto.randomUUID();

    await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role: { connect: { id: parseInt(role) } },
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add user" };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await db.user.delete({
      where: { id: userId },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete user" };
  }
};

export const updateUser = async (formData: FormData) => {
  try {
    const userId = formData.get("userId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    await db.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        role: { connect: { id: parseInt(role) } },
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update user" };
  }
};

const validateGitHubRepo = (githubRepo: string) => {
  if (!githubRepo) {
    return { error: "Invalid github repo" };
  }

  /**
   * Validate the repo - Ensure the URL includes github.com
   */
  if (!githubRepo.includes("github.com")) {
    return { error: "Invalid github repo" };
  }

  /**
   * When the githubRepo URL comes in, it will look something like this:
   * https://github.com/redwoodjs/sdk
   * I need to get the owner and the repo from this URL.
   */
  const [owner, repo] = githubRepo.split("/").slice(-2);

  // check to make sure the owner and repo are valid and one of the values is NOT github and the other is not empty
  if (owner === "github" || repo === "github" || !owner || !repo) {
    return { error: "Invalid github repo" };
  }

  return { owner, repo };
};

export const addAddOn = async (formData: FormData) => {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const githubRepo = formData.get("githubRepo") as string;
    const addonName = formData.get("addonName") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const briefDescription = formData.get("briefDescription") as string;
    const status = formData.get("status") as string;
    const category = formData.get("category") as string;
    const featured = formData.has("featured");

    const { owner, repo, error } = validateGitHubRepo(githubRepo);

    if (error) {
      return { error };
    }

    await db.addOn.create({
      data: {
        firstName,
        lastName,
        email,
        repo: repo!,
        owner: owner!,
        name: addonName,
        demo: demoUrl,
        description: briefDescription,
        status: { connect: { id: parseInt(status) } },
        category: {
          connect: { id: parseInt(category) },
        },
        featured,
        order: 0,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add add on" };
  }
};

export const deleteAddOn = async (addOnId: string) => {
  try {
    await db.addOn.delete({
      where: { id: addOnId },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete add-on" };
  }
};

export const updateAddOn = async (formData: FormData) => {
  try {
    const addOnId = formData.get("addOnId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const githubRepo = formData.get("githubRepo") as string;
    const addonName = formData.get("addonName") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const briefDescription = formData.get("briefDescription") as string;
    const status = formData.get("status") as string;
    const category = formData.get("category") as string;
    const featured = formData.has("featured");

    console.log({
      firstName,
      lastName,
      email,
      githubRepo,
      addonName,
      demoUrl,
      briefDescription,
      status,
      category,
      featured,
    });

    const { owner, repo, error } = validateGitHubRepo(githubRepo);

    if (error) {
      return { error };
    }

    await db.addOn.update({
      where: { id: addOnId },
      data: {
        firstName,
        lastName,
        email,
        repo: repo!,
        owner: owner!,
        name: addonName,
        demo: demoUrl,
        description: briefDescription,
        status: { connect: { id: parseInt(status) } },
        category: {
          connect: { id: parseInt(category) },
        },
        featured,
        order: 0,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add add on" };
  }
};

export const updateAddOnStatus = async (addOnId: string, status: number) => {
  try {
    await db.addOn.update({
      where: { id: addOnId },
      data: { status: { connect: { id: status } } },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update add on status" };
  }
};

export const updateAddOnFeatured = async (
  addOnId: string,
  featured: boolean
) => {
  try {
    await db.addOn.update({
      where: { id: addOnId },
      data: { featured },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update add on featured" };
  }
};

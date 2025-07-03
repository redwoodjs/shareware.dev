"use server";

import { db } from "@/db";
import { validateGitHubRepo } from "./admin/actions";

export const toggleAdminBar = async (
  userId: string,
  isAdminBarShowing: boolean
) => {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: { isAdminBarShowing },
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to toggle admin bar" };
  }
};

export const newSubscriber = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;

    // validate form
    if (!email || !firstName) {
      return { error: "All fields are required" };
    }

    const subscriber = await db.subscriber.create({
      data: { email, firstName },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to add." };
  }
};

export const submitAddOn = async (formData: FormData) => {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const githubRepo = formData.get("githubRepo") as string;
    const addonName = formData.get("addonName") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const briefDescription = formData.get("briefDescription") as string;
    const coverImage = formData.get("coverImage") as File;
    const category = formData.get("category") as string;

    const { owner, repo, error } = validateGitHubRepo(githubRepo);

    if (error) {
      return { error };
    }

    // validate form
    if (
      !firstName ||
      !lastName ||
      !email ||
      !githubRepo ||
      !addonName ||
      !demoUrl ||
      !coverImage ||
      !briefDescription ||
      !category
    ) {
      return { error: "All fields are required" };
    }

    // add the add on to the database
    const addOn = await db.addOn.create({
      data: {
        firstName,
        lastName,
        email,
        avatar: "",
        cover: "",
        demo: demoUrl,
        repo: repo!,
        owner: owner!,
        order: 0,
        name: addonName,
        description: briefDescription,
        category: {
          connect: { id: parseInt(category) },
        },
        status: { connect: { id: 2 } } /* pending */,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to submit add-on" };
  }
};

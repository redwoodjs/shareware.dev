"use server";

import { db } from "@/db";
import {
  validateGitHubRepo,
  validateRequiredFields,
  getOwnerAndRepo,
  uploadImageToR2,
} from "@/app/lib/formHelpers";

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
    const terms = formData.has("terms") as boolean;

    console.log({
      firstName,
      lastName,
      email,
      githubRepo,
      addonName,
      demoUrl,
      briefDescription,
      coverImage,
      category,
      terms,
    });

    if (!validateGitHubRepo(githubRepo)) {
      return { error: "Invalid github repo" };
    }

    if (!terms) {
      return { error: "You must accept the terms and conditions" };
    }

    const { owner, repo } = getOwnerAndRepo(githubRepo);

    // validate form - all fields are required
    if (
      !validateRequiredFields([
        firstName,
        lastName,
        email,
        githubRepo,
        addonName,
        briefDescription,
        category,
        coverImage.name,
      ])
    ) {
      return { error: "All fields are required" };
    }

    // Stream the file directly to R2
    const tempCoverImage = await uploadImageToR2(coverImage);

    // add the add on to the database
    const addOn = await db.addOn.create({
      data: {
        firstName,
        lastName,
        email,
        avatar: "",
        cover: tempCoverImage,
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

    // TODO: Create an issue on GitHub
    // TODO: Email all admins that want to be notified

    return { success: true };
  } catch (error) {
    return { error: "Failed to submit add-on" };
  }
};

"use server";

import { getHashedPassword } from "@/app/lib/authHelpers";
import {
  validateEmail,
  validateGitHubRepo,
  validateRequiredFields,
  getOwnerAndRepo,
  uploadImageToR2,
  deleteImageFromR2,
} from "@/app/lib/formHelpers";
import { db } from "@/db";
import { User } from "@generated/prisma";

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

export const updateAccount = async (formData: FormData) => {
  try {
    const userId = formData.get("userId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const notifyNewAddOns = formData.has("notifyNewAddOns");

    // validate the form
    // required fields
    if (!validateRequiredFields([firstName, lastName, email])) {
      return { error: "All fields are required", success: false };
    }
    // valid email
    if (!validateEmail(email)) {
      return { error: "Invalid email address", success: false };
    }

    // TODO: Update the Avatar

    let data: Partial<User> = {
      firstName,
      lastName,
      email,
      notifyNewAddOns,
    };

    // validate the password
    if (newPassword !== confirmPassword) {
      return { error: "Passwords do not match", success: false };
    }
    // hash the password
    else if (newPassword !== "") {
      data.password = await getHashedPassword(newPassword);
    }

    await db.user.update({
      where: { id: userId },
      data,
    });
    return { success: true, error: null };
  } catch (error) {
    console.error(error);

    // Check for unique constraint violation on email
    if (
      error instanceof Error &&
      error.message.includes(
        "Unique constraint failed on the fields: (`email`)"
      )
    ) {
      return { error: "Email address is already taken" };
    }

    return { error: "Failed to update user", success: false };
  }
};

export const updateUser = async (formData: FormData) => {
  try {
    const userId = formData.get("userId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    if (!validateRequiredFields([firstName, lastName, email])) {
      return { error: "All fields are required" };
    }

    if (validateEmail(email)) {
      return { error: "Invalid email address" };
    }

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

    // Check for unique constraint violation on email
    if (
      error instanceof Error &&
      error.message.includes(
        "Unique constraint failed on the fields: (`email`)"
      )
    ) {
      return { error: "Email address is already taken" };
    }

    return { error: "Failed to update user" };
  }
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
    const coverImage = formData.get("coverImage") as File;

    if (!validateGitHubRepo(githubRepo)) {
      return { error: "Invalid github repo" };
    }

    const { owner, repo } = getOwnerAndRepo(githubRepo);

    // Stream the file directly to R2
    const tempCoverImage = await uploadImageToR2(coverImage);

    await db.addOn.create({
      data: {
        firstName,
        lastName,
        email,
        repo: repo!,
        owner: owner!,
        name: addonName,
        demo: demoUrl,
        cover: tempCoverImage,
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
    const addOn = await db.addOn.delete({
      where: { id: addOnId },
    });

    // delete the cover image if it exists
    if (addOn?.cover) {
      await deleteImageFromR2(addOn.cover);
    }

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
    const prevCoverImage = formData.get("prevCoverImage") as string;
    const coverImage = formData.get("coverImage") as File;

    if (!validateGitHubRepo(githubRepo)) {
      return { error: "Invalid github repo" };
    }

    const { owner, repo } = getOwnerAndRepo(githubRepo);

    // delete the previous cover image
    if (prevCoverImage && coverImage) {
      await deleteImageFromR2(prevCoverImage);
    }

    // Stream the file directly to R2
    let tempCoverImage = prevCoverImage;
    if (coverImage) {
      tempCoverImage = await uploadImageToR2(coverImage);
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
        cover: tempCoverImage,
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

export const updateAddOnOrder = async (addOnIds: string[]) => {
  try {
    // Update all addons with their new order
    await Promise.all(
      addOnIds.map((addOnId, index) =>
        db.addOn.update({
          where: { id: addOnId },
          data: { order: index },
        })
      )
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update add on order" };
  }
};

export const uploadAvatar = async (userId: string, avatar: File) => {
  try {
    const tempAvatar = await uploadImageToR2(avatar);

    console.log("tempAvatar", tempAvatar);

    await db.user.update({
      where: { id: userId },
      data: { avatar: tempAvatar },
    });

    return { success: true, error: null, avatar: tempAvatar };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update avatar", success: false };
  }
};

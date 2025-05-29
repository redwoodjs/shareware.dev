"use server";

import { db } from "@/db";

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

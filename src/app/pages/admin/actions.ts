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

    console.log(userId, firstName, lastName, email, role);

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

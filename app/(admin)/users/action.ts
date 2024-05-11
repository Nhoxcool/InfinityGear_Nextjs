"use server";
import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";

export const updateRole = async (id: string, role: string) => {
  try {
    await startDb();

    const user = UserModel.findById(id);
    if (!user) throw new Error("User not found");

    await UserModel.findByIdAndUpdate(id, { role });
  } catch (error) {
    console.log("Error while updating user role:", (error as any).message);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await startDb();
    const user = UserModel.findById(id);
    if (!user) throw new Error("User not found");

    await UserModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("Error while deleting user account:", (error as any).message);
    throw error;
  }
};

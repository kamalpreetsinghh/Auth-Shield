import { CreateUser } from "@/common.types";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectDB();

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const createNewUser = async (createUser: CreateUser) => {
  const savedUser = await User.create(createUser);
  return savedUser;
};

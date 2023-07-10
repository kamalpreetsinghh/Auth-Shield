import { CreateUser } from "@/common.types";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectDB();

export const createNewUser = async (createUser: CreateUser) => {
  const savedUser = await User.create(createUser);
  return savedUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password"); //Not select password
  return user;
};

export const updateUserVerifyToken = async (verifyToken: string) => {
  const user = await User.findOne({
    verifyToken,
    verifyTokenExpiry: { $gt: Date.now() },
  });

  if (user) {
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
  }

  return user;
};

export const updateUserPassword = async (
  forgotPasswordToken: string,
  newPassword: string
) => {
  console.log("inside update password");
  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });

  console.log(user);

  if (user) {
    user.password = newPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();
  }

  return user;
};

import { Document, Schema, model, models } from "mongoose";

interface User extends Document {
  email: string;
  password: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = models.users || model("users", userSchema);

export default User;

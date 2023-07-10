import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createNewUser, getUserByEmail } from "@/utils/actions";
import { CreateUser } from "@/common.types";
import { sendEmail } from "@/utils/mailer";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    //check if user already exists
    const user = await getUserByEmail(email);

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const createUser: CreateUser = {
      email,
      password: hashedPassword,
    };

    const savedUser = await createNewUser(createUser);

    //send verification email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    NextResponse.json({ error: error.msg }, { status: 500 });
  }
};

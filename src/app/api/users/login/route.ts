import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/utils/actions";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    const user = await getUserByEmail(email);

    // check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    // check if password is correct
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid  password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.msg }, { status: 500 });
  }
};

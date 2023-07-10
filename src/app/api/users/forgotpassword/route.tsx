import { EmailTypes } from "@/common.types";
import { getUserByEmail } from "@/utils/actions";
import { sendEmail } from "@/utils/mailer";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { email } = requestBody;

    const user = await getUserByEmail(email);

    // check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    //send verification email
    await sendEmail({
      email,
      emailType: EmailTypes.RESET,
      userId: user._id,
    });

    return NextResponse.json({
      message: "Password reset email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.msg }, { status: 500 });
  }
};

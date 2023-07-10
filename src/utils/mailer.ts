import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { EmailTypes, SendEmail } from "@/common.types";

export const sendEmail = async ({ email, emailType, userId }: SendEmail) => {
  try {
    const token = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === EmailTypes.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === EmailTypes.RESET) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });

    const emailOptions = {
      from: "kamalpreetsingh025@gmail.com",
      to: email,
      subject:
        emailType === EmailTypes.VERIFY
          ? "Verify your email"
          : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${token}">here</a> to ${
        emailType === EmailTypes.RESET
          ? "verify your email"
          : "reset your password"
      }
          or copy and paste the link below in your browser. <br> ${
            process.env.DOMAIN
          }/verifyemail?token=${token}
          </p>`,
    };

    const response = await transport.sendMail(emailOptions);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const token = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
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
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${token}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
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

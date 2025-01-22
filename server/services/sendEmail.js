import { sendVerificationCode } from "./sendVerificationCode.js";
import UserOTP from "../models/userOTP.model.js";
import { generateOTP } from "./generateOTP.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendEmail = asyncHandler(async ({ _id, email }) => {
  const otp = generateOTP();

  try {
    await UserOTP.create({
      userId: _id,
      otp: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendVerificationCode(email, otp);

    return otp;
  } catch (error) {
    console.error("Error in sending OTP:", error);
    throw new Error("OTP sending failed");
  }
});

export { sendEmail };

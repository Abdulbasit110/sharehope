import { User } from "../models/user.model.js";
import UserOTP from "../models/userOTP.model.js";
import { sendEmail } from "../services/sendEmail.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import bcrypt from 'bcryptjs';

  // TOKENS

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();



    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "SomeThing went wrong while generating access and refresh token"
    );
  }
};

// Sign Up Route
export const registerUser = asyncHandler(async (req, res) => {

// GET DATA FROM USER
const { email, username, password } = req.body;
  // VALIDATION - NOT EMPTY

  if ([email, username, password].some((filed) => filed?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // CHECK FOR (username and email) DUPLICATION

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // CHECK FOR AVATAR

  const avatarLocalPath = req.file?.path;

  // MULTER CHECK
  // console.log(req.file)

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  // UPLOAD CLOUDINARY

  const avatar = await uploadCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required on CLoudinary");
  }
  // CREATE OBJECT
  const user = await User.create({
    email,
    avatar: avatar.url,
    password,
    username: username,
  });
  // REMOVE PASSWORD RESPONSE
  const createdUser = await User.findById(user._id).select("-password");

  // CHECK FOR USER CREATION
  if (!createdUser) {
    throw new ApiError(500, "Someting went wrong while registration the user");
  }
  // SEND EMAIL
  // console.log(createdUser)
  await sendEmail({ _id: createdUser._id, email: createdUser.email });

  // RETURN RESPONSE

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "Verification Code Sent Successfully")
    );
});

  // SING IN ROUTE

export const loginUser = asyncHandler(async (req, res) => {
  // GET DATA FROM USER

  const { email, password } = req.body;

  // VALIDATION - NOT EMYPTY

  if ([email].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "email is required");
  }

  // FIND

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  // CHECK PASSWORD

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "User does not exists");
  }

  // ACCESS AND REFRESH TOKEN

  const { accessToken} = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password"
  );

  // GENERATES COOKIES

  const options = {
    http: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User LoggedIn Successfully"
      )
    );
});

  // VERIFY EMAIL

export  const verifyEmail = asyncHandler(async (req, res) => {

    // GET OTP AND USER ID FROM USER
  
    const { otp, userId } = req.body;
    // console.log(otp,userId)
  
    // CHECK FOR USER ID AND OTP
  
    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      // FIND OTP AND USER 
      const verificationResponse = await UserOTP.find({
        userId,
      });
      // console.log(verificationResponse);
      // CHECK FOR OTP AND USER
      if (verificationResponse.length <= 0) {
        throw Error(
          "Account record does'nt exit or has been verified already. Please log in."
        );
      } else {
        const { expiresAt } = verificationResponse[0];  
  
        const hashedOTP = verificationResponse[0].otp;
  
        if (expiresAt < Date.now()) {
          await UserOTP.deleteMany({ userId });
  
          throw new Error("Code has expired. Please request again.");
        } else {
          const isOTPMatched = await bcrypt.compare( otp , hashedOTP );
          if (!isOTPMatched) {
            throw new Error( "Invalid OTP. Please try again." );
          } else {
            const updatedUser = await User.findByIdAndUpdate(
              userId,
              { isVerified: true },
              { new: true }
            );
            await UserOTP.deleteMany({ userId });
  
            res.status(200).json({
              _id: updatedUser._id,
              username: updatedUser.username,
              email: updatedUser.email,
              // // role: updatedUser.role,
              // userImg: updatedUser.img,
              // title: updatedUser.title,
              isVerified: updatedUser.isVerified,
            });
          }
        }
      }
    }
  });
  
// RESEND OTP
  
export  const resendOTP = asyncHandler( async (req, res) => {
    // GET USER ID AND EMAIL FROM USER
    const {  userId, email } = req.body;
      // console.log("Resend Email",email);
  
      if (!userId || !email) {
          throw Error("Empty user details are not allowed");
      } else {
          await UserOTP.deleteMany({ userId });
  
          await sendEmail({ _id: userId , email }, res);
          return res
          .status(200)
          .json(new ApiResponse(200, {}, "Verification Code Sent Successfully"));
      }
  });

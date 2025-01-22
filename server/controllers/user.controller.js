import { User } from "../models/user.model.js";
import UserOTP from "../models/userOTP.model.js";
import { sendEmail } from "../services/sendEmail.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

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

  const { accessToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

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

// LOGOUT

export const logoutUser = asyncHandler(async (_, res) => {
  const options = {
    http: true,
    secure: true,
  };

  //   RETURN RESPONSE

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

// VERIFY EMAIL

export const verifyEmail = asyncHandler(async (req, res) => {
  const { otp, userId } = req.body;

  if (!userId || !otp) {
    throw new Error("Empty otp details are not allowed");
  } else {
    const verificationResponse = await UserOTP.find({ userId });

    if (verificationResponse.length <= 0) {
      throw new Error("Account record doesn't exist or has been verified already. Please log in.");
    } else {
      const { expiresAt } = verificationResponse[0];
      const hashedOTP = verificationResponse[0].otp;

      if (expiresAt < Date.now()) {
        await UserOTP.deleteMany({ userId });
        throw new Error("Code has expired. Please request again.");
      } else {
        const isOTPMatched = await bcrypt.compare(otp, hashedOTP);
        if (!isOTPMatched) {
          throw new Error("Invalid OTP. Please try again.");
        } else {
          const updatedUser = await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
          await UserOTP.deleteMany({ userId });

          res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isVerified: updatedUser.isVerified,
          });
        }
      }
    }
  }
});
  


  

export // GET CURRENT USER

const getCurrentUser = asyncHandler(async (req, res) => {
  // RETURN RESPONSE
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized. Please login");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Fetched Successfully"));
});

// UPDATE AVATAR

export const updateUserAvatar = asyncHandler(async (req, res) => {
  //  GET NEW AVATAR FROM USER

  const avatarLoacalPath = req.file?.path;

  // CEHCK FOR THE LOCAL AVATAR

  if (!avatarLoacalPath) {
    throw new ApiError(400, "Avatar file is misssing");
  }

  // UPLOAD ON CLOUDINARY

  const avatar = await uploadCloudinary(avatarLoacalPath);

  // CHECK FOR AVATAR

  if (!avatar) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  // FIND AND UPDATE CURRENT USER AVATAR

  const user = await User.findOneAndUpdate(
    req.user?._id,
    {
      $set: { avatar: avatar.url },
    },
    { new: true }
  ).select("-password");

  // RETURN RESPONSE

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Image Updated Succesfully"));
});

// CHANGE PASSWORD

export const changePassword = asyncHandler(async (req, res) => {
  // GET NEW AND OLD PASSWORD

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All Required");
  }

  // GET CURRENT USER

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError("No User Found");
  }

  // CHECK OLD PSWRD

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old Password");
  }

  // REPLACE OLD TO NEW PSWRD

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  // RETURN RESPONSE

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Successfully Changed"));
});

// RESEND OTP

export const resendOTP = asyncHandler(async (req, res) => {
  // GET USER ID AND EMAIL FROM USER
  const { userId, email } = req.body;
  // console.log("Resend Email",email);

  if (!userId || !email) {
    throw Error("Empty user details are not allowed");
  } else {
    await UserOTP.deleteMany({ userId });

    await sendEmail({ _id: userId, email }, res);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Verification Code Sent Successfully"));
  }
});

import UserOTP from "../models/userOTP.model.js";
import { Ngo } from "../models/NGO.model.js";
import { sendEmail } from "../services/sendEmail.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

// TOKENS
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await Ngo.findById(userId);
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
export const registerNgo = asyncHandler(async (req, res) => {
  // GET DATA FROM NGO
  const {
    name,
    email,
    password,
    address,
    phone,
    description,
    location,
    status,
    website,
    establishedYear,
  } = req.body;
  // VALIDATION - NOT EMPTY
  console.log("test", req.body);
  // CHECK FOR (username and email) DUPLICATION
  const existedUser = await Ngo.findOne({
    $or: [{ name }, { email }, { phone }],
  });

  if (existedUser) {
    throw new ApiError(409, "Ngo with email or username already exists");
  }
  console.log("existing", existedUser);

  // CREATE OBJECT
  const user = await Ngo.create({
    name,
    email,
    password,
    address,
    phone,
    location,
    status,
    description,
    website,
    establishedYear,
  });
  // REMOVE PASSWORD RESPONSE
  const createdNgo = await Ngo.findById(user._id).select("-password");
  console.log("created", createdNgo);
  // CHECK FOR USER CREATION
  if (!createdNgo) {
    throw new ApiError(500, "Someting went wrong while registration the user");
  }
  // SEND EMAIL
  console.log(createdNgo);
  await sendEmail({ _id: createdNgo._id, email: createdNgo.email });

  // RETURN RESPONSE

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdNgo,
        "Verification Code Sent Successfully ang ngo created successfully"
      )
    );
});

//Sign In Route
export const loginNgo = asyncHandler(async (req, res) => {
  // GET DATA FROM USER
  const { email, password } = req.body;
  console.log(req.body);

  // VALIDATION - NOT EMPTY
  console.log(email, password);
  if (!email || email.trim() === "") {
    throw new ApiError(400, "Email is required");
  }

  if (!password || password.trim() === "") {
    throw new ApiError(400, "Password is required");
  }

  // FIND NGO BY EMAIL
  const user = await Ngo.findOne({ email });
  console.log("user", user);

  if (!user) {
    throw new ApiError(404, "NGO does not exist");
  }

  // CHECK PASSWORD
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // GENERATE ACCESS AND REFRESH TOKEN
  const { accessToken } = await generateAccessAndRefreshToken(user._id);
  const loggedInUser = await Ngo.findById(user._id).select("-password");

  // GENERATE COOKIES
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
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
        "NGO logged in successfully"
      )
    );
});

// VERIFY EMAIL
export const verifyEmailNgo = asyncHandler(async (req, res) => {
  // GET OTP AND USER ID FROM USER

  const { otp, userId } = req.body;
  console.log(otp, userId);

  // CHECK FOR USER ID AND OTP

  if (!userId || !otp) {
    throw Error("Empty otp details are not allowed");
  } else {
    // FIND OTP AND USER
    const verificationResponse = await UserOTP.find({
      userId,
    });
    console.log(verificationResponse);
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
        const isOTPMatched = await bcrypt.compare(otp, hashedOTP);
        if (!isOTPMatched) {
          throw new Error("Invalid OTP. Please try again.");
        } else {
          const updatedUser = await Ngo.findByIdAndUpdate(
            userId,
            { isVerified: true },
            { new: true }
          );
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

// RESEND OTP
export const resendOTPNgo = asyncHandler(async (req, res) => {
  // GET USER ID AND EMAIL FROM USER
  const { userId, email } = req.body;
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

// LOGOUT
export const logoutNgo = asyncHandler(async (req, res) => {
  console.log(req.ngo);
  const options = {
    http: true,
    secure: true,
  };

  //   RETURN RESPONSE
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Ngo Logged Out"));
});

// GET CURRENT NGO
export const getCurrentNgo = asyncHandler(async (req, res) => {
  console.log(req);
  // RETURN RESPONSE
  const ngo = req.ngo;
  if (!ngo) {
    throw new ApiError(401, "Unauthorized. Please login");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, ngo, "Ngo Fetched Successfully"));
});

export const getAllNgos = asyncHandler(async (req, res) => {
  console.log("first");
  // Extract and validate query parameters
  const { page = 1, limit = 10, search = "" } = req.query;

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  if (isNaN(pageNumber) || pageNumber <= 0) {
    throw new ApiError(400, "Invalid page number");
  }

  if (isNaN(pageSize) || pageSize <= 0) {
    throw new ApiError(400, "Invalid limit");
  }

  // Build the search query
  const searchQuery = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  // Fetch the total count and NGOs
  const totalNgos = await Ngo.countDocuments(searchQuery);
  const ngos = await Ngo.find(searchQuery)
    .sort({ createdAt: -1 }) // Sort by newest first
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  if (!ngos || ngos.length === 0) {
    throw new ApiError(404, "No NGOs found");
  }

  // Prepare the response
  const response = {
    ngos,
    totalNgos,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalNgos / pageSize),
  };

  res
    .status(200)
    .json(new ApiResponse(200, response, "NGOs fetched successfully"));
});

// UPDATE AVATAR
export const updateNgoAvatar = asyncHandler(async (req, res) => {
  //  GET NEW AVATAR FROM USER
  console.log(req.file);

  const avatarLoacalPath = req.file?.path;
  console.log(avatarLoacalPath);

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

  const user = await Ngo.findOneAndUpdate(
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
export const changeNgoPassword = asyncHandler(async (req, res) => {
  // GET NEW AND OLD PASSWORD
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All Required");
  }
  // console.log(req.user);

  // GET CURRENT USER
  const ngo = await Ngo.findById(req.ngo?._id);
  if (!ngo) {
    throw new ApiError("No Ngo Found");
  }

  // CHECK OLD PSWRD
  const isPasswordCorrect = await ngo.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old Password");
  }

  // REPLACE OLD TO NEW PSWRD
  ngo.password = newPassword;
  await ngo.save({ validateBeforeSave: false });

  // RETURN RESPONSE
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Successfully Changed"));
});

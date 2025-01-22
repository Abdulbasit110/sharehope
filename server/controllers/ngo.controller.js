import { Ngo } from "../models/ngo.model.js";
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
const { email, ngoname, password, address, phone, description, location, status, website, establishedYear } = req.body;
    // VALIDATION - NOT EMPTY

    if ([ email, ngoname, password, address, phone, description, status, website, establishedYear, location ].some((filed) => filed?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
    }

    // CHECK FOR (username and email) DUPLICATION
    const existedUser = await Ngo.findOne({
    $or: [{ ngoname }, { email }, { phone }],
    });

    if (existedUser) {
    throw new ApiError(409, "Ngo with email or username already exists");
    }

    // CHECK FOR AVATAR
    // const avatarLocalPath = req.file?.path;

    // // MULTER CHECK
    // if (!avatarLocalPath) {
    // throw new ApiError(400, "Avatar file is required");
    // }

    // UPLOAD CLOUDINARY
    // const avatar = await uploadCloudinary(avatarLocalPath);
    // if (!avatar) {
    // throw new ApiError(400, "Avatar file is required on CLoudinary");
    // }

    // CREATE OBJECT
    const user = await Ngo.create({
    // avatar: avatar.url,
    ngoname,
    email,
    password,
    address,
    phone,
    status,
    description,
    website,
    establishedYear,
    });
    // REMOVE PASSWORD RESPONSE
    const createdNgo = await Ngo.findById(user._id).select("-password");

    // CHECK FOR USER CREATION
    if (!createdNgo) {
    throw new ApiError(500, "Someting went wrong while registration the user");
    }
    // SEND EMAIL
    console.log(createdNgo)
    await sendEmail({ _id: createdNgo._id, email: createdNgo.email });

    // RETURN RESPONSE

    return res
    .status(201)
    .json(
        new ApiResponse(200, createdNgo, "Verification Code Sent Successfully ang ngo created successfully")
    );
});

//Sign In Route
export const loginNgo = asyncHandler(async (req, res) => {
  // GET DATA FROM USER
  const { ngoname, email, password } = req.body;

  // VALIDATION - NOT EMYPTY

  if ([ngoname, email].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Ngo with email or name is required");
  }

  // FIND
  const user = await Ngo.findOne({
    $or: [{ email }, { ngoname }],
  });
  if (!user) {
    throw new ApiError(404, "Ngo does not exists");
  }
  
  // CHECK PASSWORD
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "Ngo does not exists");
  }

  // ACCESS AND REFRESH TOKEN
  const { accessToken} = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await Ngo.findById(user._id).select(
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
        "Ngo LoggedIn Successfully"
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
        const isOTPMatched = await bcrypt.compare( otp , hashedOTP );
        if (!isOTPMatched) {
        throw new Error( "Invalid OTP. Please try again." );
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
export  const resendOTPNgo = asyncHandler( async (req, res) => {
    // GET USER ID AND EMAIL FROM USER
    const { userId, email } = req.body;
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

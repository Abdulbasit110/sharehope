import { Ngo } from "../models/NGO.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req , _ , next) => {
  // MAKE TOKEN FROM COOKIES
  const token = req.cookies?.accessToken;
  console.log(token);
  
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  //   DECODE TOKEN
  const decodeToken = jwt.verify(token, process.env.ACCEES_TOKEN_SECRET);

  //  FIND USER

  const ngo = await Ngo.findById(decodeToken?._id).select(
    "-password"
  );

  if (!ngo) {
    throw new ApiError(401, "Invalid Acess Token");
  }

  //  RETURN USER IN REQ
  req.ngo = ngo;
  next() ;
});
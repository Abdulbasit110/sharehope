import { Donation } from "../models/donation.model.js";
import { Ngo } from "../models/NGO.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET ALL USERS

export const getAllUsers=asyncHandler(async(_,res)=>{
    const getAllUsers=await User.find({}).select('-password');
    if(getAllUsers.length==0){
        throw new ApiError(400 , "No User found")
    }
    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            getAllUsers,
            "Users fetched successfully"
        )
    )
})

// USER DELETED

export const deleteUser=asyncHandler(async (req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        throw new ApiError(404,"User not found")
    }
    await user.deleteOne();
    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "User deleted successfully"
        )
    )
})

    // NGO

// GET ALL NGOs

export const getAllNgo=asyncHandler(async(_,res)=>{
    const getAllNgos=await Ngo.find({}).select('-password');
    if(getAllNgos.length==0){
        throw new ApiError(400,"No NGO found")
    }
    res
   .status(200)
   .json(
        new ApiResponse(
            200,
            getAllNgos,
            "NGOs fetched successfully"
        )
    )
})

// DELETE NGO

export const deleteNgo=asyncHandler(async (req,res)=>{
    const ngo=await Ngo.findById(req.params.id);
    if(!ngo){
        throw new ApiError(404,"NGO not found")
    }
    await ngo.deleteOne();
    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "NGO deleted successfully"
        )
    )
})

    // DONATION

// GET ALL DONATIONS

export const getAllDonations=asyncHandler(async(_,res)=>{
    const donation=await Donation.find();
    console.log(donation)
    if(donation.length==0){
        throw new ApiError(400,"No Donation found")
    }
    res
   .status(200)
   .json(
        new ApiResponse(
            200,
            donation,
            "Donations fetched successfully"
        )
    )
})

// DELETE DONATION

export const deleteDonation=asyncHandler(async (req,res)=>{
    const donation=await Donation.findById(req.params.id);
    if(!donation){
        throw new ApiError(404,"Donation not found")
    }
    await donation.deleteOne();
    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Donation deleted successfully"
        )
    )
})


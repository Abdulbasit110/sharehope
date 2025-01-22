import { Donation } from '../models/donation.model.js';  
import { User } from '../models/user.model.js';          
import { Ngo } from "../models/ngo.model.js";         
import {ApiError} from '../utils/ApiError.js';             
import {ApiResponse} from '../utils/ApiResponse.js';       

// Create a new donation
export const createDonation = async (req, res, next) => {
  try {
    const { ngoId, donorId, items, address, description , deliveryResponsible } = req.body;
    // console.log(req.body.ngoId)

    // Validate if NGO and Donor exist
    const ngo = await Ngo.findById(ngoId);
    const donor = await User.findById(donorId);
    

    if (!ngo || !donor) {
      throw new ApiError(404, "NGO or Donor not found");
    }

    // CHECK FOR ADRESS AND ITEMS AND DESCRIPON

    if (!address ||!items || !deliveryResponsible) {
      throw new ApiError(400, "Address, items and deliveryResponsible are required");
    }

    // CHECK FOR ITEMS AND DESCRIPTION INNER FIELDS

    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (!item.name ||!item.quantity ||!item.condition) {
          throw new ApiError(400, "Each item must have name, quantity, and condition");
        }
      });
    } else {
      throw new ApiError(400, "Items must be an array");
    }

    // CHECK FOR ADRESS INNER FIELDs
    if (typeof address!== "object" ||!address.street ||!address.city ||!address.state) {
      throw new ApiError(400, "Address must be an object with street, city, state fields");
    }

    // Create new donation record

    const donation = await new Donation({
      ngo: ngoId,
      donor: donorId,
      items: items,
      address: address,
      description: description || "",
      deliveryResponsible:deliveryResponsible
    });

    // Save donation to database
    await donation.save();

    // Return success response
    res.status(201).json(
      new ApiResponse(
        201,
        donation,
        "Donation created successfully"
      )
    );
  } catch (error) {
    next(error);  // Pass the error to global error handler
  }
};

// Get My donations
export const getMyDonations = async (req, res, next) => {
  try {
    const donorId = req.user._id;
    console.log("Logged-in donor ID:", donorId);

    const donations = await Donation.find({ donor: donorId }).populate('ngo donor');

    if (!donations || donations.length === 0) {
      throw new ApiError(404, "No donations found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        donations,
        "Donations retrieved successfully"
      )
    );
  } catch (error) {
    next(error);  // Pass the error to global error handler
  }
};


// Get donation by ID
export const getDonationById = async (req, res, next) => {
  try {
    const { donationId } = req.params; // Assuming donationId is passed as a parameter
    console.log(donationId)

    const donation = await Donation.findById(donationId).populate('ngo donor');

    if (!donation) {
      throw new ApiError(404, "Donation not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        donation,
        "Donation retrieved successfully"
      )
    );
  } catch (error) {
    next(error);  // Pass the error to global error handler
  }
};

// Update donation status
export const updateDonationStatus = async (req, res, next) => {
  try {
    const { donationId } = req.params;
    const { status } = req.body;  

    if (!status || !['pending', 'approved', 'delivered', 'cancelled'].includes(status)) {
      throw new ApiError(400, "Invalid status");
    }

    const donation = await Donation.findById(donationId);

    if (!donation) {
      throw new ApiError(404, "Donation not found");
    }

    // Update the status of the donation
    donation.status = status;
    await donation.save();

    res.status(200).json(
      new ApiResponse(
        200,
        donation,
        "Donation status updated successfully"
      )
    );
  } catch (error) {
    next(error);  // Pass the error to global error handler
  }
};

// Delete a donation
export const deleteDonation = async (req, res, next) => {
  try {
    const { donationId } = req.params; // Assuming donationId is passed as a parameter

    const donation = await Donation.findById(donationId);

    if (!donation) {
      throw new ApiError(404, "Donation not found");
    }

    // Delete the donation
    await donation.deleteOne();

    res.status(200).json(
      new ApiResponse(
        200,
        {},
        "Donation deleted successfully"
      )
    );
  } catch (error) {
    next(error);  // Pass the error to global error handler
  }
};

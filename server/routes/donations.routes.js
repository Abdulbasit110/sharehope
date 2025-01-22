import express from 'express';
import { createDonation, deleteDonation, getDonationById, getMyDonations, updateDonationStatus } from '../controllers/donation.controller.js';
import { verifyJWT } from '../middleware/isAuth.middleware.js';
// import { createDonation, getAllDonations, getDonationById, updateDonationStatus, deleteDonation } from '../controllers/donation.controller.js'

const router = express.Router();

// // Routes for Donation
router.post('/create-donation', createDonation);       
router.get('/',verifyJWT, getMyDonations);           
router.get('/:donationId', getDonationById); 
router.patch('/:donationId/status', updateDonationStatus); 
router.delete('/:donationId', deleteDonation);  
router.route('/my-donation').post(verifyJWT,createDonation)
export default router;

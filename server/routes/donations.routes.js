import express from 'express';
import { createDonation, deleteDonation, getDonationById, getMyDonations, updateDonationStatus } from '../controllers/donation.controller.js';
import { verifyJWT } from '../middleware/isAuth.middleware.js';

const router = express.Router();

// // Routes for Donation
router.post('/create-donation', createDonation);       
router.get('/',verifyJWT, getMyDonations);           
router.get('/:donationId', getDonationById); 
router.patch('/:donationId/status', updateDonationStatus); 
router.delete('/:donationId', deleteDonation);  

export default router;

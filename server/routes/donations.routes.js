import express from 'express';
<<<<<<< HEAD
// import { createDonation, getAllDonations, getDonationById, updateDonationStatus, deleteDonation } from '../controllers/donation.controller.js'

const router = express.Router();

// // Routes for Donation
// router.post('/donations', createDonation);           // Create a donation
// router.get('/donations', getAllDonations);           // Get all donations
// router.get('/donations/:donationId', getDonationById); // Get donation by ID
// router.put('/donations/:donationId/status', updateDonationStatus); // Update donation status
// router.delete('/donations/:donationId', deleteDonation);  // Delete a donation

export default router;
=======
import { verifyJWT } from '../middleware/isAuth.middleware.js';
import { createDonation} from '../controllers/donation.controller.js';

const router = express.Router();
// router.route('/my-donation').get(verifyJWT,getMyDonation)
router.route('/my-donation').post(verifyJWT,createDonation)
export default router;
>>>>>>> f69030c8a34327edab270948157587d77b6a36e3

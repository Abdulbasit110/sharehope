import express from 'express';
<<<<<<< HEAD
import { createDonation, deleteDonation, getDonationById, getMyDonations, updateDonationStatus } from '../controllers/donation.controller.js';
import { verifyJWT } from '../middleware/isAuth.middleware.js';
=======
// <<<<<<< HEAD
// import { createDonation, getAllDonations, getDonationById, updateDonationStatus, deleteDonation } from '../controllers/donation.controller.js'
>>>>>>> 75edaa6b86e947a996b1e0be398f0b8851011ed4

// const router = express.Router();

// // Routes for Donation
router.post('/create-donation', createDonation);       
router.get('/',verifyJWT, getMyDonations);           
router.get('/:donationId', getDonationById); 
router.patch('/:donationId/status', updateDonationStatus); 
router.delete('/:donationId', deleteDonation);  

<<<<<<< HEAD
export default router;
=======
// =======
import { verifyJWT } from '../middleware/isAuth.middleware.js';
import { createDonation} from '../controllers/donation.controller.js';

const router = express.Router();
// router.route('/my-donation').get(verifyJWT,getMyDonation)
router.route('/my-donation').post(verifyJWT,createDonation)
export default router;
// >>>>>>> f69030c8a34327edab270948157587d77b6a36e3
>>>>>>> 75edaa6b86e947a996b1e0be398f0b8851011ed4

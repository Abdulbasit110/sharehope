import express from 'express';
import { verifyJWT } from '../middleware/isAuth.middleware.js';
import { createDonation, getMyDonation } from '../controllers/donation.controller.js';

const router = express.Router();
<<<<<<< HEAD
router.route('/my-donation').get(verifyJWT,getMyDonation)
router.route('/my-donation').get(verifyJWT,createDonation)
=======
// router.route('my-donation').get(getMyDonation)
>>>>>>> c5e96d93be8cc828507d1fbf702f47fa12f5a4dc
export default router;
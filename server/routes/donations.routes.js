import express from 'express';
import { verifyJWT } from '../middleware/isAuth.middleware.js';
import { createDonation, getMyDonation } from '../controllers/donation.controller.js';

const router = express.Router();
router.route('/my-donation').get(verifyJWT,getMyDonation)
router.route('/my-donation').get(verifyJWT,createDonation)
export default router;
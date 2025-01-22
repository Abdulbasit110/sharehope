import express from 'express';
import { verifyJWT } from '../middleware/isAuth.middleware.js';
import { createDonation} from '../controllers/donation.controller.js';

const router = express.Router();
// router.route('/my-donation').get(verifyJWT,getMyDonation)
router.route('/my-donation').post(verifyJWT,createDonation)
export default router;
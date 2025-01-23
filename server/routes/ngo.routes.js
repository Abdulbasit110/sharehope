import express from 'express';
import { loginNgo, logoutNgo, registerNgo, resendOTPNgo, verifyEmailNgo, getCurrentNgo,getAllNgos, updateNgoAvatar, changeNgoPassword } from '../controllers/ngo.controller.js';
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from '../middleware/isNgo.middleware.js';

const router = express.Router();

// SIGNUP ROUTE
router.route('/register').post( upload.single('avatar'), registerNgo);

// LOGIN
router.route('/login').post(loginNgo)

// VERIFY-EMAIL
router.route('/verify-email').post(verifyEmailNgo)

// RESEND-OTP
router.route('/resend-otp').post(resendOTPNgo);

// LOGOUT
router.route("/logout").post( verifyJWT, logoutNgo);

//UPDATE AVATAR NGO
router.route("/updateNgo-avatar").patch(verifyJWT, upload.single("avatar"), updateNgoAvatar);

//GET NGO
router.route("/get").get( verifyJWT, getCurrentNgo);
router.route("/getall").get(getAllNgos);

//CHANGE-PASSWORD
router.route("/changeNgo-password").post(verifyJWT, changeNgoPassword);

export default router;
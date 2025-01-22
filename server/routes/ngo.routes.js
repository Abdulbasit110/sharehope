import express from 'express';
import { loginNgo, logoutNgo, registerNgo, resendOTPNgo, verifyEmailNgo, getCurrentNgo, updateNgoAvatar, changeNgoPassword } from '../controllers/ngo.controller.js';
import { upload } from "../middleware/multer.middleware.js";
// import { verifyJWT } from '../middleware/isAuth.middleware.js';
import { verifyJWT } from '../middleware/isNgo.middleware.js';

const router = express.Router();

// SIGNUP ROUTE
router.route('/register').post( upload.single('avatar'), registerNgo);

// LOGIN
router.route('/login').post(loginNgo)

// VERIFY
router.route('/verify-email').post(verifyEmailNgo)

// RESEND
router.route('/resend-otp').post(resendOTPNgo);

// LOGOUT
router.route("/logout").post( verifyJWT, logoutNgo);

//UPDATE AVATAR NGO
router.route("/updateNgo-avatar").patch(verifyJWT, upload.single("avatar"), updateNgoAvatar);

//GET A NGO
router.route("/get").get( verifyJWT, getCurrentNgo);


//CHANGE PASSWORD
router.route("/changeNgo-password").post(verifyJWT, changeNgoPassword);

export default router;
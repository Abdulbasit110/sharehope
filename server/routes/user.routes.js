import { Router } from "express";
import { loginUser, registerUser, resendOTP, verifyEmail } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();
// SIGNUP ROUTE
router.route('/register').post( upload.single('avatar') , registerUser)
// LOGIN
router.route('/login').post(loginUser)
// VERIFY
router.route('/verify-email').post(verifyEmail)
// RESEND
router.route('/resend-otp').post(resendOTP)

export default router;
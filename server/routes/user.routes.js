import { Router } from "express";
import { changePassword, getCurrentUser, loginUser, logoutUser, registerUser, resendOTP, updateUserAvatar, verifyEmail } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/isAuth.middleware.js";
const router = Router();
// SIGNUP ROUTE
router.route('/register').post( upload.single('avatar') , registerUser)
// LOGIN
router.route('/login').post(loginUser)
// LOGOUT
router.route("/logout").post(verifyJWT, logoutUser);
// GET USER
router.route("/").get(verifyJWT , getCurrentUser);
// UPDATE AVATAR
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
//   CHANGE PASSWORD
router.route("/change-password").post(verifyJWT, changePassword);
// VERIFY
router.route('/verify-email').post(verifyEmail)
// RESEND
router.route('/resend-otp').post(resendOTP)
export default router;
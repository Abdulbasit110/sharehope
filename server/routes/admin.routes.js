import { Router } from "express";
import { verifyJWT } from "../middleware/isAuth.middleware.js";
import { deleteNgo, deleteUser, getAllNgo, getAllUsers } from "../controllers/admin.controller.js";
const router = Router();

        // USER 

// GET ALL USERS
router.route("/all-users").get( verifyJWT , getAllUsers );

// DELETE USER
router.route("/:id").delete( verifyJWT , deleteUser );

        // NGO

// GET ALL NGO
router.route("/all-ngo").get( verifyJWT , getAllNgo );

// DELETE USER
router.route("/:id").delete( verifyJWT , deleteNgo );


export default router;
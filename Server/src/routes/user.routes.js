import {Router} from "express"
import {
    registerUser,
    loginUser,
    getCurrentUser,
    userUpdate
} from "../controllers/user.controller.js"

import {
    userBodyDataFilter,
    loginBodyDatafilter
} from "../middleware/user.middleware.js"
import{verifyJWT} from "../middleware/auth.middleware.js"

const router = Router();

router.route("/register").post(userBodyDataFilter,registerUser);
router.route("/login").post(loginBodyDatafilter,loginUser); 
router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/update").put(verifyJWT,userUpdate); // put since we are updating  all features 

export default router;

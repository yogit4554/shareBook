import {Router} from "express"
import {
    registerUser,
    loginUser,
    userFindOne,
    userUpdate
} from "../controllers/user.controller.js"

import {
    userBodyDataFilter,
    loginBodyDatafilter
} from "../middleware/user.middleware.js"

const router = Router();

router.route("/register").post(userBodyDataFilter,registerUser);
router.route("/login").post(loginBodyDatafilter,loginUser);

export default router;

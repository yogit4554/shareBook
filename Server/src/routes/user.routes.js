import {Router} from "express"
import {
    registerUser,
    loginUser,
    userFindOne,
    userUpdate
} from "../controllers/user.controller.js"

const router = Router();

router.route("/register").post(registerUser);


export default router;

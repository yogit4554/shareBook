import { Router } from "express";
import {
    getOrderByUserId,
    createOrder
} from "../controllers/order.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();

router.route("/create").post(verifyJWT,createOrder);
router.route("/myorder").get(verifyJWT,getOrderByUserId);

export default router;
import { Router } from "express";
import {
    createPayment,
    verifyPayment
}from "../controllers/transaction.controller.js"

const router = Router();

router.route("/createPayment").post(createPayment);
router.route("/verifyPayment").post(verifyPayment);
export default router;
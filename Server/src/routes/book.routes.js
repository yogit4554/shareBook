import { Router } from "express";
import {
    getBooks
} from "../controllers/book.controller.js"

const router = Router();

router.route("/getBooks").get(getBooks);

export default router;
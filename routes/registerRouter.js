import express from "express";
import * as registerController from "../controllers/registerController.js";

const router = express.Router();

router.route("/").post(registerController.handleNewUser);

export default router;
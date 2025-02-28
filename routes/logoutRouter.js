import express from "express";
import * as logoutController from "../controllers/logoutController.js";

const router = express.Router();

router.route("/").get(logoutController.handleLogout);

export default router;
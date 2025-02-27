import express from "express";
import * as refreshTokenController from "../controllers/refreshTokenController.js";

const router = express.Router();

router.route("/").get(refreshTokenController.handleRefreshToken);

export default router;
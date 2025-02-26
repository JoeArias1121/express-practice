import express from "express";
import * as playersController from "../../controllers/playersController.js";
import verifyJWT from "../../middleware/verifyJWT.js";

const router = express.Router();

router.route("/")
  .get(verifyJWT, playersController.getAllPlayers)
  .post(playersController.addPlayer)
  .put(playersController.updatePlayer)
  .delete(playersController.deletePlayer);

router.route("/:id")
  .get(playersController.getPlayer);

export default router;
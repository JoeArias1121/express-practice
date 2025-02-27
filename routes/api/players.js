import express from "express";
import * as playersController from "../../controllers/playersController.js";

const router = express.Router();

router.route("/")
  .get(playersController.getAllPlayers)
  .post(playersController.addPlayer)
  .put(playersController.updatePlayer)
  .delete(playersController.deletePlayer);

router.route("/:id")
  .get(playersController.getPlayer);

export default router;
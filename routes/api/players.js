import express from "express";
import * as playersController from "../../controllers/playersController.js";
import players from "../../model/players.json" assert { type: "json" };

let data = [...players];

const router = express.Router();

router.route("/")
  .get(playersController.getAllPlayers)
  .post(playersController.addPlayer)
  .put(playersController.updatePlayer)
  .delete(playersController.deletePlayer);

router.route("/:id").get((req, res) => {
  const player = data.find((player) => player.id === Number(req.params.id));
  if (!player) {
    res.status(404).json({ message: "Player not found" });
  }
  res.json(player);
});

export default router;
import express from "express";
//import path from "node:path"
//import { fileURLToPath } from "node:url";
import players from "../../data/players.json" assert { type: "json" };

//const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();
let data = [...players];

function print(data) {
  data.forEach((player) => {
    console.log(player);
  });
}

router
  .route("/")
  .get((req, res) => {
    res.json(data);
  })
  .post((req, res) => {
    console.log(`Data before operation: ${print(data)}`);
    data.push(req.body);
    console.log(`Data after operation: ${print(data)}`);
    res.json(data);
  })
  .put((req, res) => {
    console.log(`Data before operation: ${print(data)}`);
    data = data.map((player) => {
      if (player.id === req.body.id) {
        player.firstName = req.body.firstName;
        player.lastName = req.body.lastName;
      }
      return player;
    });
    console.log(`Data after operation: ${print(data)}`);
    res.json(data);
  })
  .delete((req, res) => {
    console.log(`Data before operation: ${print(data)}`);
    data = data.filter((player) => player.id !== req.body.id);
    console.log(`Data after operation: ${print(data)}`);
    res.json(data);
  });

router.route("/:id").get((req, res) => {
  const player = data.find((player) => player.id === Number(req.params.id));
  if (!player) {
    res.status(404).json({ message: "Player not found" });
  }
  res.json(player);
});

export default router;

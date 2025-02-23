import express from 'express';
//import path from "node:path"
//import { fileURLToPath } from "node:url";
import players from "../../data/players.json" assert { type: "json"};

//const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();
let data = players;

router.route('/')
  .get((req, res) => {
    res.json(data);
  })
  .post((req, res) => {
    data.push(req.body);
    res.json(data);
  })
  .put((req, res) => { 
    data = data.map(player => {
      if (player.id === req.body.id) {
        player.firstName = req.body.firstName;
        player.lastName = req.body.lastName;
        res.json(player);
      }
    })
  })
  .delete((req, res) => {
    data = data.filter(player => player.id !== req.body.id);
    res.json(data);
  })

export default router;
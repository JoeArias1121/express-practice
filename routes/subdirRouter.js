import express from 'express';
import path from "node:path"
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const router = express.Router();

router.get("/", (req, res) => { 
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
})

router.get("/players", (req, res) => { 
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "players.html"));
})


export default router;
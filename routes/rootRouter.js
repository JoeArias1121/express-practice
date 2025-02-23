import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// simple get request to send the index.html file to the client
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get('/old-page', (req, res) => {
  res.redirect(301, '/new-page');
});

export default router;
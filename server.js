import * as http from "http";
import * as fs from "fs/promises";
import express from "express";
import * as path from "path";
import { fileURLToPath } from "node:url";

import { logEvent } from "./middleware/logEvents.js";
import { EventEmitter } from "events";

const app = express();
const PORT = process.env.PORT || 3500;
const dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(logEvent);

app.use(express.urlencoded({ extended: false}))

app.use(express.json());

app.use(express.static(path.join(dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: dirname });
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("Data recieved");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const emitter = new EventEmitter();











// emitter.on("log", logEvent)

// emitter.emit("log", "I just made an event emitter!")
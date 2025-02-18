import * as http from "http";
import * as fs from "fs/promises";
import express from "express";
import * as path from "path";
import { fileURLToPath } from "node:url";
import cors from "cors";

import { logEvent } from "./middleware/logEvents.js";
import { EventEmitter } from "events";

const app = express();
const PORT = process.env.PORT || 3500;
const dirname = path.dirname(fileURLToPath(import.meta.url));

// cors options
const whitelist = ["http://localhost:3000", "http://localhost:3500", "https://www.google.com"];
const corsOptions = {
  origin: function (origin, callback) { 
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else { 
      console.log(`This is the origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  }
}
// this is my own custom middleware by importing it from another file it stays clean and organized
// this middleware is similar to morgan
app.use(logEvent);
// below add a the cors middleware to allow cross origin requests and learn about the different options like origin, methods, etc
app.use(cors(corsOptions));
// this is a builtin middleware that allows us to parse the body of a request (html forms)
app.use(express.urlencoded({ extended: false}))
// this is a builtin middleware that allows us to parse the body of a request (json)
app.use(express.json());
// this is a builtin middleware that allows us to serve static files (html, css, js, images, etc and make it available for the client to access)
app.use(express.static(path.join(dirname, "/public")));

// simple get request to send the index.html file to the client
app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: dirname });
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("Data recieved");
});

// at the very end add a error handling middleware to catch any errors that may occur
app.use((err, req, res, next) => { 
  console.error(err.stack);

  res.status(500).send("Something went wrong in the server!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const emitter = new EventEmitter();











// emitter.on("log", logEvent)

// emitter.emit("log", "I just made an event emitter!")
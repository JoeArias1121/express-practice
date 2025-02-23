import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

import { logEvent } from "./middleware/logEvents.js";
//import { EventEmitter } from "events";

import subdirRouter from "./routes/subdirRouter.js";
import rootRouter from "./routes/rootRouter.js";
import playersRouter from "./routes/api/players.js";

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
app.use('/', express.static(path.join(dirname, "/public")));
// by default .use add '/' so when adding a subdirectory we need to specify the subdirectory in the first argument
// reason why we have to do this with static files is because we need to tell the server to serve these file to the subdirectory
app.use('/subdir', express.static(path.join(dirname, "/public")));

app.use('/', rootRouter);
// making use of app.use to use the router from the subdirRouter file and have modular routes for organization
app.use('/subdir', subdirRouter)
app.use('/api/players', playersRouter);

// this is to catch ant routes that are not found and send a 404 status code
app.all("*", (req, res) => {
  res.status(404).sendFile("./views/404.html", { root: dirname });
  if (req.accepts("html")) {
    res.sendFile("./views/404.html", { root: dirname });
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("text").send("404 not found")
  }
})
// at the very end add a error handling middleware to catch any errors that may occur this is when there's an error in the server
app.use((err, req, res, next) => { 
  console.error(err.stack);

  res.status(500).send("Something went wrong in the server!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
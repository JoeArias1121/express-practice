import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

import { logEvent } from "./middleware/logEvents.js";
import corsOptions from "./configs/corsOptions.js";

import subdirRouter from "./routes/subdirRouter.js";
import rootRouter from "./routes/rootRouter.js";
import registerRouter from "./routes/registerRouter.js";
import authRouter from "./routes/authRouter.js";
import refreshRouter from "./routes/refreshRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import playersRouter from "./routes/api/players.js";
import credentials from "./middleware/credentials.js";
import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3500;
const dirname = path.dirname(fileURLToPath(import.meta.url));


app.use(logEvent);

// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware that parses JSON bodies
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use('/', express.static(path.join(dirname, "/public")));
app.use('/subdir', express.static(path.join(dirname, "/public")));

// routes
app.use('/', rootRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use('/subdir', subdirRouter);
app.use(verifyJWT);
app.use('/api/players', playersRouter);

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

app.use((err, req, res, next) => { 
  console.error(err.stack);

  res.status(500).send("Something went wrong in the server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
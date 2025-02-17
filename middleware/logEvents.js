// this file is going to create going to append to a logs.txt file and return a string for the line added to the logs.txt
// this will be utilized by other files to log events in the metnioned file and also in the console
import { v4 as uuid } from "uuid";
import fs from "node:fs/promises";
import { format } from "date-fns";
import * as path from "node:path";

// function getDateTime() {
//   const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
//   return dateTime;
// }

// console.log(`${getDateTime()} - ${uuid()}`);

export default function emitEvent(msg, file = "eventLog.txt") {
  const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const event = `${dateTime} - ${uuid()} - ${msg}`;
  console.log(event)
  fs.appendFile(`./logs/${file}`, `${event}\n`)
}

export const logEvent = (req, res, next) => {
  emitEvent(`${req.method} - ${req.headers.origin} - ${req.url}`, "reqLog.txt");
  console.log(`${req.method} - ${req.path}`);
  next();
};
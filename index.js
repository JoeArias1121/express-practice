import fs from 'node:fs/promises';
import path from 'node:path';
import eventEmitter from './logEvents.js'
// read file og.txt and write it to a new file called newOG.txt
const dirname = "."

// async function readFile(filePath) {
//   const rf = await fs.readFile(filePath, "utf-8")
//   await fs.writeFile(path.join(dirname, "newOG.txt"), `${rf}\n`)
//   await fs.appendFile(path.join(dirname, "newOG.txt"), "I am going to make an event emitter!\n\n")
//   const newrf = await fs.readFile(path.join(dirname, "newOg.txt"), "utf-8");
//   console.log(`${rf}\n`);
//   console.log(newrf);
// }
readFile(path.join(dirname, "og.txt"))

eventEmitter("I just made an event emitter!")
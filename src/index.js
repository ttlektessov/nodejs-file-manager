import { homedir } from "os";
import readline from "readline";
import { resolvePath } from "./utils/utils.js";
import { up, cd, ls, setCurrentDir, printCurrentDir } from "./nav/nav.js";
import { cat } from "./file_management/read.js";
import { add } from "./file_management/createFile.js";
import { mkdir } from "./file_management/createFolder.js";
import { rename } from "./file_management/rename.js";
import { copy } from "./file_management/copy.js";
import { move } from "./file_management/move.js";
import { remove } from "./file_management/delete.js";
import { handleOSCommand } from "./os/os.js";
import { hash } from "./hash/hash.js";
import { compress } from "./zip/compress.js";
import { decompress } from "./zip/decompress.js";
const username = process.env.npm_config_username || "unknown";

console.log(`Welcome to the File Manager, ${username}!`);

const homeDir = homedir();
setCurrentDir(homeDir);
printCurrentDir();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.on("line", async (line) => {
  const input = line.trim();
  const [cmd, ...args] = input.split(" ");
  const consoleArg = args.join(" ");
  console.log(consoleArg);
  switch (cmd) {
    case ".exit":
      rl.close();
      return;

    case "up":
      up();
      break;

    case "ls":
      await ls();
      break;

    case "cd":
      if (consoleArg) {
        await cd(consoleArg);
      } else {
        console.log("Invalid input");
      }
      break;

    case "cat":
      if (consoleArg) {
        await cat(consoleArg);
      } else {
        console.log("Invalid input");
      }
      break;

    case "add":
      if (consoleArg) {
        await add(consoleArg);
      } else {
        console.log("Invalid input");
      }
      break;

    case "mkdir":
      if (consoleArg) {
        await mkdir(consoleArg);
      } else {
        console.log("Invalid input");
      }
      break;

    case "rn":
      const [renameFilePath, ...nameParts] = consoleArg.split(" ");
      const renameFileName = nameParts.join(" ");
      if (renameFilePath && renameFileName) {
        const resolvedOldPath = resolvePath(renameFilePath);
        const resolvedNewPath = resolvePath(renameFileName);
        await rename(resolvedOldPath, resolvedNewPath);
      } else {
        console.log("Invalid input");
      }
      break;

    case "cp":
      const [copyFilePath, copyNewFilePath] = consoleArg.split(" ");
      if (copyFilePath && copyNewFilePath) {
        const resolvedSrc = resolvePath(copyFilePath);
        const resolvedDest = resolvePath(copyNewFilePath);
        await copy(resolvedSrc, resolvedDest);
      } else {
        console.log("Invalid input");
      }
      break;

    case "mv":
      const [moveFilePath, moveNewFilePath] = consoleArg.split(" ");
      if (moveFilePath && moveNewFilePath) {
        const resolvedSrc = resolvePath(moveFilePath);
        const resolvedDest = resolvePath(moveNewFilePath);
        await move(resolvedSrc, resolvedDest);
      } else {
        console.log("Invalid input");
      }
      break;

    case "rm":
      if (consoleArg) {
        const resolvedPath = resolvePath(consoleArg);
        await remove(resolvedPath);
      } else {
        console.log("Invalid input");
      }
      break;

    case "os":
      if (args.length === 1) {
        handleOSCommand(args[0]);
      } else {
        console.log("Invalid input");
      }
      break;

    case "hash":
      if (consoleArg) {
        await hash(consoleArg);
      } else {
        console.log("Invalid input");
      }
      break;

    // When using the compress command, don't forget to add the file extension to the destination path
    // (ex: compress C:\Users\yourname\randomfile.txt C:\Users\yourname\randomfile.txt.br)
    case "compress":
      const [compressFilePath, compressDestPath] = consoleArg.split(" ");
      if (compressFilePath && compressDestPath) {
        await compress(compressFilePath, compressDestPath);
      } else {
        console.log("Invalid input");
      }
      break;

    // Same here, don't forget to add the file extension to the destination path
    // (ex: compress C:\Users\yourname\randomfile.txt C:\Users\yourname\randomfile.txt.br)
    case "decompress":
      const [decompressFilePath, decompressDestPath] = consoleArg.split(" ");
      if (decompressFilePath && decompressDestPath) {
        await decompress(decompressFilePath, decompressDestPath);
      } else {
        console.log("Invalid input");
      }
      break;

    default:
      console.log("Invalid input");
  }

  printCurrentDir();
  rl.prompt();
});

rl.on("close", () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

rl.on("SIGINT", () => {
  rl.close();
});

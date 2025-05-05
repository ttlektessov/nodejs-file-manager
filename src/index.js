import { homedir } from "os";
import readline from "readline";
import { up, cd, ls, setCurrentDir, printCurrentDir } from "./nav/nav.js";
import { cat } from "./file_management/read.js";
import { add } from "./file_management/createFile.js";
import { mkdir } from "./file_management/createFolder.js";
import { rename } from "./file_management/rename.js";
import { resolvePath } from "./utils/utils.js";

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
      const [filePath, fileName] = consoleArg.split(" ");
      if (filePath && fileName) {
        const resolvedOldPath = resolvePath(filePath);
        const resolvedNewPath = resolvePath(fileName);
        await rename(resolvedOldPath, resolvedNewPath);
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

import { homedir } from "os";
import readline from "readline";
import { up, cd, ls, setCurrentDir, printCurrentDir } from "./nav/nav.js";
import { cat } from "./file_management/read.js";

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
  const pathArg = args.join(" ");
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
      if (pathArg) {
        await cd(pathArg);
      } else {
        console.log("Invalid input.");
      }
      break;

    case "cat":
      if (pathArg) {
        await cat(pathArg);
      } else {
        console.log("Invalid input");
      }
      break;

    default:
      console.log("Invalid input.");
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

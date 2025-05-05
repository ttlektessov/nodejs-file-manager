import { homedir } from "os";
import readline from "readline";

const username = process.env.npm_config_username || "unknown";
let currDir = homedir();

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currDir}`);

const printDir = () => {
  console.log(`You are currently in ${currDir}`);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.on("line", async (line) => {
  const command = line.trim();

  if (command === ".exit") {
    rl.close();
    return;
  }
  console.log("Invalid input.");
  printDir();
  rl.prompt();
});

rl.on("close", () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

rl.on("SIGINT", () => {
  rl.close();
});

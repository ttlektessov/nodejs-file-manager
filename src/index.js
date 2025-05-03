import { homedir } from "os";
import readline from "readline";

const args = process.argv.slice(2);
const username = process.env.npm_config_username || "unknown";

console.log(`Welcome to the File Manager, ${username}!`);

let currDir = homedir();
console.log(`You are currently in ${currDir}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.on("SIGINT", () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

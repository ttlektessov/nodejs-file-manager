import path from "path";
import fs from "fs/promises";
import { stat } from "fs/promises";

let currentDir = process.cwd();
export const setCurrentDir = (dir) => {
  currentDir = dir;
};

export const up = () => {
  const parentDir = path.dirname(currentDir);
  const rootDir = path.parse(currentDir).root;
  if (currentDir !== rootDir) {
    currentDir = parentDir;
  }
  printCurrentDir();
};

export const cd = async (targetPath) => {
  const newPath = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(currentDir, targetPath);
  try {
    const stats = await stat(newPath);
    if (stats.isDirectory()) {
      currentDir = newPath;
    } else {
      console.log("Invalid input");
    }
  } catch {
    console.log("Operation failed");
  }
  printCurrentDir();
};

export const ls = async () => {
  try {
    const entries = await fs.promises.readdir(currentDir, {
      withFileTypes: true,
    });
    const folders = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => ({ Name: entry.name, Type: "directory" }));

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => ({ Name: entry.name, Type: "file" }));
    const sorted = [...folders, ...files].sort((a, b) =>
      a.Name.localeCompare(b.Name)
    );
    console.table(sorted);
  } catch {
    console.log("Operation failed");
  }
};

export const printCurrentDir = () => {
  console.log(`You are currently in ${currentDir}`);
};

export const getCurrentDir = () => currentDir;

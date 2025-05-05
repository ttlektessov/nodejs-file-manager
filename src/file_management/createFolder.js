import fs from "node:fs/promises";
import path from "path";
import { getCurrentDir } from "../nav/nav.js";

export const mkdir = async (folderName) => {
  const currentDir = getCurrentDir();
  const folderPath = path.join(currentDir, folderName);

  try {
    await fs.mkdir(folderPath);
    console.log("Folder created successfully");
  } catch (err) {
    console.error("Operation failed");
  }
};

import fs from "node:fs/promises";
import path from "path";
import { getCurrentDir } from "../nav/nav.js";

export const add = async (fileName) => {
  const currentDir = getCurrentDir();
  const filePath = path.join(currentDir, fileName);

  try {
    await fs.writeFile(filePath, "");
    console.log("File created successfully");
  } catch {
    console.error("Operation failed");
  }
};

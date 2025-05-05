import fs from "node:fs";
import path from "path";
import { getCurrentDir } from "../nav/nav.js";

export const mkdir = async (folderName) => {
  const currentDir = getCurrentDir();
  const folderPath = path.join(currentDir, folderName);

  if (fs.existsSync(folderPath)) {
    console.log("Operation failed");
    return;
  }

  fs.mkdir(folderPath, (err) => {
    if (err) {
      console.error("Operation failed");
    } else {
      console.log("Folder created successfully");
    }
  });
};

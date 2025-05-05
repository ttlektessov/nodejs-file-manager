import fs from "node:fs";
import path from "path";
import { getCurrentDir } from "../nav/nav.js";

export const add = async (fileName) => {
  const currentDir = getCurrentDir();
  const filePath = path.join(currentDir, fileName);

  if (fs.existsSync(filePath)) {
    console.log("Operation failed");
    return;
  }

  fs.writeFile(filePath, "", (err) => {
    if (err) {
      console.error("Operation failed");
    } else {
      console.log("File created successfully");
    }
  });
};

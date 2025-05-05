import fs from "node:fs";
import path from "path";
import { getCurrentDir } from "../nav/nav.js";

export const cat = async (filePath) => {
  try {
    const currentDir = getCurrentDir();
    const resolvedPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(currentDir, filePath);

    const readStream = fs.createReadStream(resolvedPath, { encoding: "utf-8" });

    readStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    readStream.on("end", () => {
      process.stdout.write("\n");
    });

    readStream.on("error", () => {
      console.error("Operation failed");
    });
  } catch {
    console.error("Operation failed");
  }
};

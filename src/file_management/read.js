import fs from "node:fs";
import { resolvePath } from "../utils/utils.js";

export const cat = async (filePath) => {
  try {
    const resolvedPath = resolvePath(filePath);

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

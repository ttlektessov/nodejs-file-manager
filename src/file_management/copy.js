import fs from "node:fs";
import path from "node:path";

export const copy = async (sourcePath, destDir) => {
  try {
    const fileName = path.basename(sourcePath);
    const destPath = path.join(destDir, fileName);

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.on("error", () => {
      console.error("Operation failed");
    });

    writeStream.on("error", () => {
      console.error("Operation failed");
    });

    readStream.pipe(writeStream).on("finish", () => {
      console.log("Copy complete");
    });
  } catch (err) {
    console.error("Operation failed");
  }
};

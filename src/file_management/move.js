import fs from "node:fs";
import path from "node:path";

export const move = async (sourcePath, destDir) => {
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
      fs.rm(sourcePath, (err) => {
        if (err) {
          console.error("Operation failed");
        } else {
          console.log("Move complete");
        }
      });
    });
  } catch {
    console.error("Operation failed");
  }
};

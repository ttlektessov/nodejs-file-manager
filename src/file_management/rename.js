import fs from "node:fs";

const fileName = "src/fs/files/wrongFilename.txt";
const newFileName = "src/fs/files/properFilename.md";

const rename = async () => {
  fs.rename(fileName, newFileName, (err) => {
    if (err) console.error("FS operation failed");
    else console.log("Rename complete");
  });
};

await rename();

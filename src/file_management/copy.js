import fs from "node:fs";

const folderName = "src/fs/files";
const copyFolderName = "src/fs/files_copy";

const copy = async () => {
  if (fs.existsSync(copyFolderName) || !fs.existsSync(folderName)) {
    console.error("FS operation failed");
    return;
  }
  fs.cp(folderName, copyFolderName, { recursive: true }, (err) => {
    if (err) console.error("FS operation failed");
    else {
      console.log("Copy complete");
    }
  });
};

await copy();

import fs from "node:fs";

const fileName = "src/fs/files/fileToRemove.txt";

const remove = async () => {
  fs.rm(fileName, (err) => {
    if (err) console.error("FS operation failed");
    else {
      console.log("File removed successfully");
    }
  });
};

await remove();

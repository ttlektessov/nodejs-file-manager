import fs from "node:fs";

const fileName = "src/fs/files/fileToRead.txt";
const read = async () => {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) console.error("FS operation failed");
    else console.log(data);
  });
};

await read();

import fs from "node:fs";

const create = async () => {
  if (fs.existsSync("src/fs/files/fresh.txt")) {
    console.error("FS operation failed");
    return;
  }
  fs.writeFile("src/fs/files/fresh.txt", "I am fresh and young", (err) => {
    if (err) console.error("FS operation failed");
    else {
      console.log("Create success");
    }
  });
};

await create();

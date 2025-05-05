import fs from "node:fs";

export const remove = async (filePath) => {
  try {
    fs.rm(filePath, (err) => {
      if (err) {
        console.error("Operation failed");
      } else {
        console.log("File removed successfully");
      }
    });
  } catch {
    console.error("Operation failed");
  }
};

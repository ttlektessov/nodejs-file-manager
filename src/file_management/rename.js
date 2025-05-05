import fs from "node:fs";

export const rename = async (filePath, fileName) => {
  try {
    fs.rename(filePath, fileName, (err) => {
      if (err) {
        console.error("Operation failed");
      } else {
        console.log("Rename complete");
      }
    });
  } catch (err) {
    console.error("Operation failed");
  }
};

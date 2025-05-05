import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { resolvePath } from "../utils/utils.js";

export const hash = async (filePath) => {
  try {
    const resolvedPath = resolvePath(filePath);
    const hashObj = createHash("sha256");
    const input = createReadStream(resolvedPath);

    input.on("error", () => {
      console.error("Operation failed");
    });

    input.on("readable", () => {
      const data = input.read();
      if (data) hashObj.update(data);
      else {
        console.log(hashObj.digest("hex"));
      }
    });
  } catch {
    console.error("Operation failed");
  }
};

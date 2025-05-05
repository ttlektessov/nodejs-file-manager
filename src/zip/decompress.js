import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream";
import { resolvePath } from "../utils/utils.js";

export const decompress = async (src, dest) => {
  try {
    const archivePath = resolvePath(src);
    const extractedPath = resolvePath(dest);

    const source = createReadStream(archivePath);
    const destination = createWriteStream(extractedPath);
    const brotli = createBrotliDecompress();

    pipeline(source, brotli, destination, (err) => {
      if (err) {
        console.error("Operation failed");
      }
    });
  } catch {
    console.error("Operation failed");
  }
};

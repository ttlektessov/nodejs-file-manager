import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream";
import { resolvePath } from "../utils/utils.js";

export const compress = async (src, dest) => {
  try {
    const fileToCompressPath = resolvePath(src);
    const archivePath = resolvePath(dest);

    const source = createReadStream(fileToCompressPath);
    const destination = createWriteStream(archivePath);
    const brotli = createBrotliCompress();

    pipeline(source, brotli, destination, (err) => {
      if (err) {
        console.error("FS operation failed");
      }
    });
  } catch {
    console.error("FS operation failed");
  }
};

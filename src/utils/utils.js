import path from "path";
import { getCurrentDir } from "../nav/nav.js";

export const resolvePath = (targetPath) => {
  const currentDir = getCurrentDir();
  return path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(currentDir, targetPath);
};

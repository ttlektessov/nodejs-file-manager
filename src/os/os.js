import os from "node:os";

export const handleOSCommand = (flag) => {
  switch (flag) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;

    default:
      console.log("Invalid input");
  }
};

import os from "node:os";

export const handleOSCommand = (flag) => {
  switch (flag) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--cpus":
      const cpus = os.cpus();
      console.log(`Total CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        const { model, speed } = cpu;
        console.log(
          `CPU ${index + 1}: ${model}, ${(speed / 1000).toFixed(2)} GHz`
        );
      });
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(process.arch);
      break;
    default:
      console.log("Invalid input");
  }
};

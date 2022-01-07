import { ipcMain } from "electron";
import { exec } from "child_process";

let lastCommand = "";

async function getDockerCommand() {
  const response: string = await new Promise((resolve, reject) => {
    exec("cat ~/.zsh_history", (error, stdout) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });

  const lastFiveCommands = response
    .split("\n")
    .filter(Boolean)
    .slice(1)
    .slice(-5);

  let hasDockerCommand = false;

  lastFiveCommands.forEach((item) => {
    if (item.includes("docker")) {
      if (lastCommand === "") return (lastCommand = item);
      const currentIndex = lastFiveCommands.indexOf(item);
      const lastIndex = lastFiveCommands.indexOf(lastCommand);
      if (currentIndex > lastIndex) {
        hasDockerCommand = true;
        lastCommand = item;
      }
    }
  });

  if (hasDockerCommand) return ipcMain.emit("uptdateMenu");
}

export function listener() {
  setInterval(getDockerCommand, 3000);
}

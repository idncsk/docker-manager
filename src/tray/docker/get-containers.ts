import { exec } from "child_process";

export async function getContainers() {
  const command: string = await new Promise((resolve, reject) => {
    exec("docker ps -a", (err, stdout, stderr) => {
      const error = err || stderr;
      if (error) reject(error);

      resolve(stdout as string);
    });
  });

  const lines = command.split("\n").filter(Boolean);
  lines.shift();

  const containerNames = [];

  for (const line of lines) {
    const columns = line.split(" ").filter(Boolean);
    const name = columns.pop();
    const status = line.includes("Up") ? true : false;

    containerNames.push({ name, status });
  }

  return containerNames;
}

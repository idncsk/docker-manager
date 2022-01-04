import { exec } from "child_process";

export async function startContainer(containerName: string) {
  return await new Promise((resolve, reject) => {
    exec(`docker start ${containerName}`, (err, stdout, stderr) => {
      const error = err || stderr;
      if (error) reject(error);

      resolve(stdout);
    });
  });
}

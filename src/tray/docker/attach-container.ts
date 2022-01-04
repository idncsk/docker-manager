import { exec } from "child_process";

export async function attachContainer(name: string) {
  return await new Promise((resolve, reject) => {
    exec(`docker ps -f name=${name}`, (err, stdout, stderr) => {
      if (err || stderr) reject(err || stderr);

      if (!stdout.includes(name)) reject("Container is not running");
      exec(`konsole -e docker exec -it ${name} bash`);
      resolve(null);
    });
  });
}

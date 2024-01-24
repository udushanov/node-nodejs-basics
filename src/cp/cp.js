import { spawn } from "node:child_process";
import { dirname, join } from "node:path";

const spawnChildProcess = async (args) => {
  const currentDir = dirname(import.meta.url).substring(8);
  const scriptPath = join(currentDir, "files", "script.js");
  
  const childProcess = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "inherit", "ipc"],
  });

  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.on("data", (data) => {
    console.log(`Received from child process: ${data.toString()}`);
  });

  process.on("exit", () => {
    childProcess.kill("SIGTERM");
  });
};

spawnChildProcess(["someArgument1", "someArgument2"]);

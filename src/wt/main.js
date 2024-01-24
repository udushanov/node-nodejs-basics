import { Worker, isMainThread } from "node:worker_threads";
import { dirname, join } from "node:path";

const performCalculations = async () => {
  const currentDir = dirname(import.meta.url).substring(8);
  const workerPath = join(currentDir, "worker.js");

  if (isMainThread) {
    const n = 10;

    const worker = new Worker(workerPath, {
      workerData: n,
    });

    return new Promise((resolve) => {
      worker.on("message", (result) => {
        console.log(`The result of nthFibonacci(${n}) is: ${result}`);
        resolve(result);
      });
    });
  }
};

await performCalculations();

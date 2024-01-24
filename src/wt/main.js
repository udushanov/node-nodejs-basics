import { Worker, isMainThread } from "node:worker_threads";
import { dirname, join } from "node:path";
import { cpus } from "node:os";

const performCalculations = async () => {
  const currentDir = dirname(import.meta.url).substring(8);
  const workerPath = join(currentDir, "worker.js");
  const NUM_CORES = cpus().length;

  if (isMainThread) {
    const workers = [];
    const results = [];

    for (let i = 0; i < NUM_CORES; i++) {
      const worker = new Worker(workerPath, {
        workerData: i + 10,
      });

      workers.push(worker);

      worker.on("message", (result) => {
        results.push({
          status: "resolved",
          data: result,
        });

        if (results.length === NUM_CORES) {
          console.log("Results:", results);
        }
      });

      worker.on("error", (error) => {
        results.push({
          status: "error",
          data: null,
        });

        if (results.length === NUM_CORES) {
          console.log("Results:", results);
        }

        console.error(`Worker error: ${error}`);
      });
    }
  }
};

await performCalculations();

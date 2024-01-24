import { parentPort, workerData, isMainThread } from "node:worker_threads";
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (result) => {
  if (isMainThread) {
    throw new Error("sendResult should be called inside the worker thread");
  }

  parentPort.postMessage(result);
};

if (!isMainThread) {
  const n = workerData;
  const result = nthFibonacci(n);
  sendResult(result);
}

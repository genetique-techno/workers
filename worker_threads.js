const {
  Worker, isMainThread, parentPort, workerData,
} = require("worker_threads");
const h = require("highland");

if (isMainThread) {
  
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, { workerData: "buttz" });
    worker.on("online", () => console.log("worker is online"));
    worker.on("message", msg => {
      console.log(msg)
      resolve(msg)
    });
    worker.on("error", reject);
  });

} else {
  setTimeout(() => {
    parentPort.postMessage("data");
    process.exit(0);
  }, 1000)
}

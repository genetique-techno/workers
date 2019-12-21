const { EventEmitter } = require("events");
const h = require("highland");
const workerpool = require("workerpool");

const pool = workerpool.pool(`${__dirname}/worker.js`, {
  minWorkers: "max",
  maxWorkers: 3,
  maxQueueSize: 10,
  workerType: "thread",
});

const messages = new EventEmitter();

h("thing", messages)
  .ratelimit(1, 100)
  .map(msg => h(pool.exec("job", [ msg ])))
  .merge()
  .tap(x => console.log("msg rcvd: ", x))
  .done(() => process.exit(0))

setTimeout(() => messages.emit("thing", "hello"), 2000);
setTimeout(() => messages.emit("thing", "hello"), 2500);
setTimeout(() => messages.emit("thing", "hello"), 3000);
setTimeout(() => messages.emit("thing", "hello"), 6000);


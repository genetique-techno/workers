const workerpool = require("workerpool");

setInterval(() => console.log("worker chillin"), 2000)

const fn = message => new Promise((resolve, reject) => {
  setTimeout(() => resolve(message), 1000);
});

workerpool.worker({ job: fn });

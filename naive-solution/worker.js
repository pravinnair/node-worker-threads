/** @format */

const { parentPort } = require('worker_threads');

let counter = 0;

// iterate for 20_000_000_000 times
for (let i = 0; i < 20000000000; i++) {
	counter++;
}

parentPort.postMessage(counter);

/** @format */

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const THREAD_COUNT = 2;
const { Worker } = require('worker_threads');

function createWorker() {
	return new Promise((resolve, reject) => {
		const worker = new Worker('./optimized-solution/two-workers.js', {
			workerData: { thread_count: THREAD_COUNT },
		});
		worker.on('message', (data) => {
			resolve(data);
		});
		worker.on('error', (error) => {
			reject(`An error occured ${error}`);
		});
	});
}

app.get('/non-blocking', (req, res) => {
	console.log('Processing Non-Blocking request...');
	console.log('Completed Non-Blocking request...');
	res.status(200).send(`Non-Blocking request processed!!!`);
});

// forcefully make the endpoint run 20million times to stop the main thread respond for other requests
app.get('/blocking', async (req, res) => {
	console.log('Processing Blocking request...');
	const workerPromises = []; // this is where all the workers will be pushed into
	// iterate through the number of threads alloted
	for (let i = 0; i < THREAD_COUNT; i++) {
		workerPromises.push(createWorker()); //create a worker against each thread
	}
	const thread_results = await Promise.all(workerPromises);
	console.log(`Print thread results: ${thread_results}`);
	const totalCount = thread_results.reduce((sum, count) => sum + count, 0);
	res.status(200).send(`Blocking ops total execution count = ${totalCount}`);
});

app.listen(port, () => {
	console.log(`App is litening on port-${port}`);
});

/** @format */

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const { Worker } = require('worker_threads');

app.get('/non-blocking', (req, res) => {
	console.log('Processing Non-Blocking request...');
	console.log('Completed Non-Blocking request...');
	res.status(200).send(`Non-Blocking request processed!!!`);
});

// forcefully make the endpoint run 20million times to stop the main thread respond for other requests
app.get('/blocking', (req, res) => {
	console.log('Processing Blocking request...');
	const worker = new Worker('./naive-solution/worker.js');
	worker.on('message', (data) => {
		console.log(`Worker completed: ${data}`);
		res.status(200).send(`Blocking processed using worker, count is ${data}`);
	});

	worker.on('error', (error) => {
		console.log(`Worker completed with error: ${error}`);
		res.status(404).send(`Error processing request ${error}`);
	});
});

app.listen(port, () => {
	console.log(`App is litening on port-${port}`);
});

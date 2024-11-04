/** @format */

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/non-blocking', (req, res) => {
	console.log('Processing Non-Blocking request...');
	console.log('Completed Non-Blocking request...');
	res.status(200).send(`Non-Blocking request processed!!!`);
});

// forcefully make the endpoint run 20million times to stop the main thread respond for other requests
app.get('/blocking', (req, res) => {
	console.log('Processing Blocking request...');
	let counter = 0;

	// iterate for 20_000_000_000 times
	for (let i = 0; i < 20000000000; i++) {
		counter++;
	}
	console.log(`Completed Blocking request: ${counter}`);
	res
		.status(200)
		.send(`Non-blocking request processed, counter is: ${counter}`);
});

app.listen(port, () => {
	console.log(`App is litening on port-${port}`);
});

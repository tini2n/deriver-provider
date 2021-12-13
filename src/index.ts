require('dotenv').config();
import 'reflect-metadata';

import express from 'express';
import parser from 'body-parser';

import { HttpError } from './models';

import { deriverRouter } from './routes';

const app = express();

app.use(parser.json());

app.use((_req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // CORS policy
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	next();
});

app.use('/api/deriver', deriverRouter);

app.use((_req, _res, next) => {
	throw new HttpError('Could not find this route...', 404);
});

app.listen(process.env.PORT || 5000, () => {
	console.log('Server running on port 5000');
});

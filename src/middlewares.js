import fs from 'fs';

// Cross-Origin Resource Sharing (CORS) Middleware
export const corsHandler = (req, res, next) => { // handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  next();
};


/**
 * Error-Handler Middleware
 *
 * @param {import("express").Errback} err The http-error objecet
 * @param {import("express").Request} req The http-reequest object
 * @param {import("express").Response} res The http-response object
 * @param {import("express").NextFunction} next The next function
 */
export const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const isCSE = ['EvalError', 'Error'].includes(err.name);
  res.status(err.statusCode || (isCSE ? 400 : 500)).send({ status: false, message: err.message });
};


/**
 * Calculate the time-elapsed in milliseconds
 *
 * @param {number} t The time the request started
 * @tutorial https://slao.io/blog/posts/request-duration/
 */
const getTimeElapsedInMs = (t) => (diff = process.hrtime(t)) => ((diff[0] * 1e9 + diff[1]) / 1e6);
const logFilePath = 'logs.txt';

// Processing-Time-Handler Middleware
export const processingTimeHandler = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const timeElapsedInMs = getTimeElapsedInMs(start)();
    fs.appendFileSync(logFilePath, `${req.method}\t\t${req.originalUrl}\t\t${res.statusCode}\t\t${Math.round(timeElapsedInMs).toString().padStart(2, '0')}ms\n`);
  });

  res.on('close', () => {
    const timeElapsedInMs = getTimeElapsedInMs(start)();
    fs.appendFileSync(logFilePath, `${req.method}\t\t${req.originalUrl}\t\t${res.statusCode}\t\t${Math.round(timeElapsedInMs).toString().padStart(2, '0')}ms\n`);
  });

  next();
};

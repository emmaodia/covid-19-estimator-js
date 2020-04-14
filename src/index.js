import express from 'express';
import compression from 'compression';
import path from 'path';
import { corsHandler, errorHandler, processingTimeHandler } from './middlewares';
import routesHandler from './routes';

const app = express();
app.use(compression());
app.use(corsHandler);
app.use(express.json());// parse request data to JSON object
app.use(processingTimeHandler);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/v1', routesHandler(express.Router()), errorHandler);

const server = app.listen(process.env.PORT || 2020, (error) => {
  console.log(error ? `Error: ${error.message}...` : `Listening on PORT: ${server.address().port}`);// eslint-disable-line no-console
}).on('error', (error) => {
  const report = (error.code === 'EADDRINUSE') ? `The port [${process.env.PORT || 2020}] is in use` : undefined;
  console.log(report || `${error.name} --- ${error.message}`);// eslint-disable-line no-console
});

module.exports = server;

import { config } from 'dotenv';
import express from 'express';
import expressip from 'express-ip';
import fingerprint from 'express-fingerprint';
import morgan from 'morgan';
import router from './routes';
import errorHandler from './middleware/errorHandler';

config();

const app = express();

app.use(expressip().getIpInfoMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fingerprint());
if (['development', 'staging', 'production'].includes(process.env.NODE_ENV)) {
  app.use(morgan('dev'));
}

app.use(router);

app.get('/', (request, response) => {
  response.status(200).json({
    status: 'success',
    message: 'welcome to "Sessions Manager"',
  });
});

app.all('*', (_, response) => {
  response.status(404).json({
    status: 'error',
    error: 'endpoint/resource not found',
  });
});

app.use(errorHandler);

export default app;

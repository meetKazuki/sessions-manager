import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (['development', 'staging', 'production'].includes(process.env.NODE_ENV)) {
  app.use(morgan('dev'));
}

app.get('/', (_, response) => {
  response.status(200).json({
    status: 'success',
    message: 'welcome to "Project Deliver"',
  });
});

app.all('*', (_, response) => {
  response.status(404).json({
    status: 'error',
    error: 'endpoint/resource not found',
  });
});

export default app;

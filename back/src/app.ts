import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import 'module-alias/register';

import cors from './utils/cors';
import Routes from './routes/index';

const app: express.Application = express();

app.use(bodyParser.json());
dotenv.config();

app.use(cors);

app.use(Routes);

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Started server with 8080');
    });
  })
  .catch((err) => console.log(err));

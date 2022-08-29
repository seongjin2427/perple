import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import 'module-alias/register';

import Routes from './routes/index';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
dotenv.config();

app.use(Routes);

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Started server with 8080');
    });
  })
  .catch((err) => console.log(err));

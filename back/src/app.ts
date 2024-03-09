import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import "module-alias/register";

import Routes from "./routes/index";

const app: express.Application = express();

dotenv.config();

app.use(bodyParser.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.REACT_APP_BASE_URL,
    credentials: true,
  })
);

app.use(Routes);

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Started server with 8080");
    });
  })
  .catch((err) => console.log(err));

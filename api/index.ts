import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/users";
import config from "./config";

const app = express();
const port =  8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRouter);

const run = async () => {
  await mongoose.connect(config.database);
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();

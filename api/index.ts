import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/users";
import config from "./config";
import {itemsRouter} from './routers/Items';
import {categoriesRouter} from './routers/categories';

const app = express();
const port =  8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);

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

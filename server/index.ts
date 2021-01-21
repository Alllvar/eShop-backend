import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './router';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(process.env.SERVER_PORT, async () => {
  console.log('Example app listening at 8081');
  await mongoose.connect('mongodb://localhost/eshop', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('connected to db');
});

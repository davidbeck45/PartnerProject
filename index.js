import express from 'express';
import cors from 'cors';
import StoresRouter from './store.js';

import mongoose from 'mongoose';

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to the MongoDB database
await mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });

app.get("/", (req, res) => {
  console.log(req, res);
  res.json({
    code: 200,
    message: "Hello, Express",
  });
});

app.use('/stores', StoresRouter);


app.listen(port, () => {
  console.log(`listening on localhost:${port}...`);
});

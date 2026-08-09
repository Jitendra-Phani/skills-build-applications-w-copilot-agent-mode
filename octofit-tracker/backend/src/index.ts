import 'dotenv/config';
import express from 'express';
import { connectDB } from './db';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

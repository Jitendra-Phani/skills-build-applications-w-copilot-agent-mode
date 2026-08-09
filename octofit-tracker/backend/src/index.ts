import 'dotenv/config';
import express from 'express';
import { connectDB } from './db';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

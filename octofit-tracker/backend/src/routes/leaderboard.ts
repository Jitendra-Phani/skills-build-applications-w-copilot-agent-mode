import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leaderboard', error });
  }
});

router.get('/:rank', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.findOne({ rank: Number(req.params.rank) });
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leaderboard entry', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEntry = await LeaderboardEntry.create(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create leaderboard entry', error });
  }
});

export default router;

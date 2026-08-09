import { Router } from 'express';

const router = Router();

const leaderboard = [
  { rank: 1, team: 'Morning Marathoners', points: 980 },
  { rank: 2, team: 'Sunset Sprinters', points: 920 },
  { rank: 3, team: 'Evening Energizers', points: 875 }
];

router.get('/', (req, res) => {
  res.json(leaderboard);
});

router.get('/:rank', (req, res) => {
  const entry = leaderboard.find((item) => String(item.rank) === req.params.rank);
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.json(entry);
});

export default router;

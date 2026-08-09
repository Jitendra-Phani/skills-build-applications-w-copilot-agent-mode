import { Router } from 'express';

const router = Router();

const teams = [
  { id: '1', name: 'Morning Marathoners', coach: 'Leo Adams' },
  { id: '2', name: 'Sunset Sprinters', coach: 'Eva Kim' }
];

router.get('/', (req, res) => {
  res.json(teams);
});

router.get('/:id', (req, res) => {
  const team = teams.find((item) => item.id === req.params.id);
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

router.post('/', (req, res) => {
  const { name, coach } = req.body;
  const newTeam = {
    id: String(teams.length + 1),
    name: name || `Team ${teams.length + 1}`,
    coach: coach || 'TBD'
  };

  teams.push(newTeam);
  res.status(201).json(newTeam);
});

export default router;

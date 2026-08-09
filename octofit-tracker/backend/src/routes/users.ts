import { Router } from 'express';

const router = Router();

const users = [
  { id: '1', name: 'Ava Martinez', email: 'ava@octofit.com', teamId: '1' },
  { id: '2', name: 'Noah Patel', email: 'noah@octofit.com', teamId: '1' },
  { id: '3', name: 'Mia Chen', email: 'mia@octofit.com', teamId: '2' }
];

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.post('/', (req, res) => {
  const { name, email, teamId } = req.body;
  const newUser = {
    id: String(users.length + 1),
    name: name || 'Unnamed User',
    email: email || 'user@octofit.com',
    teamId: teamId || null
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;

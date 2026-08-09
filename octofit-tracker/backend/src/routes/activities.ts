import { Router } from 'express';

const router = Router();

const activities = [
  { id: '1', userId: '1', type: 'Running', durationMinutes: 40, distanceKm: 8, date: '2026-08-01' },
  { id: '2', userId: '2', type: 'Cycling', durationMinutes: 55, distanceKm: 22, date: '2026-08-02' },
  { id: '3', userId: '3', type: 'Yoga', durationMinutes: 35, distanceKm: 0, date: '2026-08-03' }
];

router.get('/', (req, res) => {
  res.json(activities);
});

router.get('/:id', (req, res) => {
  const activity = activities.find((item) => item.id === req.params.id);
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
});

router.post('/', (req, res) => {
  const { userId, type, durationMinutes, distanceKm, date } = req.body;
  const newActivity = {
    id: String(activities.length + 1),
    userId: userId || '1',
    type: type || 'Workout',
    durationMinutes: durationMinutes || 30,
    distanceKm: distanceKm || 0,
    date: date || new Date().toISOString().split('T')[0]
  };

  activities.push(newActivity);
  res.status(201).json(newActivity);
});

export default router;

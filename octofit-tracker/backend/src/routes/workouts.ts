import { Router } from 'express';

const router = Router();

const workouts = [
  { id: '1', title: '5K Tempo Run', focus: 'Cardio', lengthMinutes: 35, difficulty: 'Intermediate' },
  { id: '2', title: 'Strength Circuit', focus: 'Full Body', lengthMinutes: 45, difficulty: 'Advanced' },
  { id: '3', title: 'Recovery Yoga', focus: 'Mobility', lengthMinutes: 30, difficulty: 'Beginner' }
];

router.get('/', (req, res) => {
  res.json(workouts);
});

router.get('/:id', (req, res) => {
  const workout = workouts.find((item) => item.id === req.params.id);
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json(workout);
});

router.post('/', (req, res) => {
  const { title, focus, lengthMinutes, difficulty } = req.body;
  const newWorkout = {
    id: String(workouts.length + 1),
    title: title || `Workout ${workouts.length + 1}`,
    focus: focus || 'General Fitness',
    lengthMinutes: lengthMinutes || 30,
    difficulty: difficulty || 'Beginner'
  };

  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});

export default router;

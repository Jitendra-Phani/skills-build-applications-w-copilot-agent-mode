import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch activities', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch activity', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const newActivity = await Activity.create(req.body);
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create activity', error });
  }
});

export default router;

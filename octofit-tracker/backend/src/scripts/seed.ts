import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seeding the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const teams = await Team.create([
      { name: 'Morning Marathoners', coach: 'Leo Adams' },
      { name: 'Sunset Sprinters', coach: 'Eva Kim' },
      { name: 'Trail Blazers', coach: 'Sophia Lee' }
    ]);

    const users = await User.create([
      { name: 'Ava Martinez', email: 'ava@octofit.com', teamId: teams[0]._id.toString() },
      { name: 'Noah Patel', email: 'noah@octofit.com', teamId: teams[0]._id.toString() },
      { name: 'Mia Chen', email: 'mia@octofit.com', teamId: teams[1]._id.toString() },
      { name: 'Elijah Rivers', email: 'elijah@octofit.com', teamId: teams[1]._id.toString() },
      { name: 'Zoey Brooks', email: 'zoey@octofit.com', teamId: teams[2]._id.toString() }
    ]);

    await Activity.create([
      { userId: users[0]._id.toString(), type: 'Running', durationMinutes: 42, distanceKm: 8.2, date: '2026-08-01' },
      { userId: users[1]._id.toString(), type: 'Cycling', durationMinutes: 55, distanceKm: 22.4, date: '2026-08-02' },
      { userId: users[2]._id.toString(), type: 'Strength Training', durationMinutes: 50, distanceKm: 0, date: '2026-08-03' },
      { userId: users[3]._id.toString(), type: 'Swimming', durationMinutes: 30, distanceKm: 1.2, date: '2026-08-04' },
      { userId: users[4]._id.toString(), type: 'Trail Run', durationMinutes: 60, distanceKm: 10.5, date: '2026-08-05' }
    ]);

    await LeaderboardEntry.create([
      { rank: 1, team: teams[0].name, points: 980 },
      { rank: 2, team: teams[1].name, points: 920 },
      { rank: 3, team: teams[2].name, points: 890 }
    ]);

    await Workout.create([
      { title: '5K Tempo Run', focus: 'Cardio', lengthMinutes: 35, difficulty: 'Intermediate' },
      { title: 'Strength Circuit', focus: 'Full Body', lengthMinutes: 45, difficulty: 'Advanced' },
      { title: 'Recovery Yoga', focus: 'Mobility', lengthMinutes: 30, difficulty: 'Beginner' },
      { title: 'Core Stability Flow', focus: 'Strength', lengthMinutes: 40, difficulty: 'Intermediate' }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

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
      { name: 'Sunset Sprinters', coach: 'Eva Kim' }
    ]);

    const users = await User.create([
      { name: 'Ava Martinez', email: 'ava@octofit.com', teamId: teams[0]._id.toString() },
      { name: 'Noah Patel', email: 'noah@octofit.com', teamId: teams[0]._id.toString() },
      { name: 'Mia Chen', email: 'mia@octofit.com', teamId: teams[1]._id.toString() }
    ]);

    await Activity.create([
      { userId: users[0]._id.toString(), type: 'Running', durationMinutes: 42, distanceKm: 8.2, date: '2026-08-01' },
      { userId: users[1]._id.toString(), type: 'Cycling', durationMinutes: 55, distanceKm: 22.4, date: '2026-08-02' },
      { userId: users[2]._id.toString(), type: 'Yoga', durationMinutes: 35, distanceKm: 0, date: '2026-08-03' }
    ]);

    await LeaderboardEntry.create([
      { rank: 1, team: teams[0].name, points: 980 },
      { rank: 2, team: teams[1].name, points: 920 }
    ]);

    await Workout.create([
      { title: '5K Tempo Run', focus: 'Cardio', lengthMinutes: 35, difficulty: 'Intermediate' },
      { title: 'Strength Circuit', focus: 'Full Body', lengthMinutes: 45, difficulty: 'Advanced' },
      { title: 'Recovery Yoga', focus: 'Mobility', lengthMinutes: 30, difficulty: 'Beginner' }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

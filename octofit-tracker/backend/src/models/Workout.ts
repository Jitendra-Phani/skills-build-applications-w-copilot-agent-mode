import mongoose, { Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  focus: string;
  lengthMinutes: number;
  difficulty: string;
}

const WorkoutSchema = new mongoose.Schema<IWorkout>({
  title: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  lengthMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true }
}, { timestamps: true });

const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;

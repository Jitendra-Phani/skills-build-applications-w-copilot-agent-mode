import mongoose, { Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  date: string;
}

const ActivitySchema = new mongoose.Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, required: true },
  date: { type: String, required: true }
}, { timestamps: true });

const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
export default Activity;

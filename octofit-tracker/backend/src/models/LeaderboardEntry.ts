import mongoose, { Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  team: string;
  points: number;
}

const LeaderboardEntrySchema = new mongoose.Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true, unique: true },
  team: { type: String, required: true },
  points: { type: Number, required: true }
}, { timestamps: true });

const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);
export default LeaderboardEntry;

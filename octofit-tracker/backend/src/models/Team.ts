import mongoose, { Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  coach: string;
}

const TeamSchema = new mongoose.Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  coach: { type: String, required: true }
}, { timestamps: true });

const Team = mongoose.model<ITeam>('Team', TeamSchema);
export default Team;

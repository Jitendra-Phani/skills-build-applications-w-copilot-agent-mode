import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  teamId: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  teamId: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;

import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    age: { type: Number, required: true },
    team: { type: String, required: true },
    role: { type: String, required: true },
    joinedDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    memberCount: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    username: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const Leaderboard = model('Leaderboard', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);

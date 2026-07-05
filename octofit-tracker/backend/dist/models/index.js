"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.Leaderboard = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    age: { type: Number, required: true },
    team: { type: String, required: true },
    role: { type: String, required: true },
    joinedDate: { type: Date, required: true },
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    memberCount: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }],
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);

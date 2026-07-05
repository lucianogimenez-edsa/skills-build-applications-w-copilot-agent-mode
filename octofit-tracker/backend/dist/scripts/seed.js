"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const models_1 = require("../models");
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        console.log('Seed the octofit_db database with test data');
        await (0, database_1.connectDatabase)();
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.Leaderboard.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        await models_1.Team.insertMany([
            { name: 'OctoRunners', motto: 'Eight arms, one finish line', memberCount: 3, totalPoints: 2875 },
            { name: 'Code Crushers', motto: 'Ship reps, not excuses', memberCount: 3, totalPoints: 2630 },
            { name: 'Trail Blazers', motto: 'Find the next climb', memberCount: 2, totalPoints: 2210 },
        ]);
        await models_1.User.insertMany([
            {
                username: 'mona-fit',
                email: 'mona.fit@example.com',
                displayName: 'Mona Fit',
                age: 31,
                team: 'OctoRunners',
                role: 'captain',
                joinedDate: new Date('2026-01-08'),
            },
            {
                username: 'hubert-lifts',
                email: 'hubert.lifts@example.com',
                displayName: 'Hubert Lifts',
                age: 28,
                team: 'Code Crushers',
                role: 'member',
                joinedDate: new Date('2026-02-14'),
            },
            {
                username: 'alex-trails',
                email: 'alex.trails@example.com',
                displayName: 'Alex Trails',
                age: 35,
                team: 'Trail Blazers',
                role: 'captain',
                joinedDate: new Date('2026-03-03'),
            },
            {
                username: 'sam-swift',
                email: 'sam.swift@example.com',
                displayName: 'Sam Swift',
                age: 26,
                team: 'OctoRunners',
                role: 'member',
                joinedDate: new Date('2026-03-21'),
            },
        ]);
        await models_1.Activity.insertMany([
            {
                username: 'mona-fit',
                activityType: 'Outdoor run',
                durationMinutes: 42,
                caloriesBurned: 410,
                activityDate: new Date('2026-07-01'),
            },
            {
                username: 'hubert-lifts',
                activityType: 'Strength training',
                durationMinutes: 55,
                caloriesBurned: 360,
                activityDate: new Date('2026-07-02'),
            },
            {
                username: 'alex-trails',
                activityType: 'Mountain hike',
                durationMinutes: 96,
                caloriesBurned: 720,
                activityDate: new Date('2026-07-03'),
            },
            {
                username: 'sam-swift',
                activityType: 'Cycling intervals',
                durationMinutes: 48,
                caloriesBurned: 520,
                activityDate: new Date('2026-07-04'),
            },
        ]);
        await models_1.Leaderboard.insertMany([
            { username: 'mona-fit', team: 'OctoRunners', points: 1280, rank: 1 },
            { username: 'alex-trails', team: 'Trail Blazers', points: 1175, rank: 2 },
            { username: 'sam-swift', team: 'OctoRunners', points: 1045, rank: 3 },
            { username: 'hubert-lifts', team: 'Code Crushers', points: 980, rank: 4 },
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'Morning Mobility Reset',
                category: 'mobility',
                difficulty: 'beginner',
                durationMinutes: 18,
                exercises: ['Cat-cow flow', 'World greatest stretch', 'Hip airplanes', 'Thoracic rotations'],
            },
            {
                title: 'Lunch Break Strength Circuit',
                category: 'strength',
                difficulty: 'intermediate',
                durationMinutes: 32,
                exercises: ['Goblet squats', 'Push-ups', 'Bent-over rows', 'Plank shoulder taps'],
            },
            {
                title: 'Endurance Builder Ride',
                category: 'cardio',
                difficulty: 'advanced',
                durationMinutes: 45,
                exercises: ['Warm-up spin', 'Six tempo intervals', 'Hill climb finish', 'Cool-down spin'],
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();

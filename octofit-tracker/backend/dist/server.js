"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const models_1 = require("./models");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
app.use((0, cors_1.default)({
    origin: codespaceName
        ? [
            `https://${codespaceName}-5173.app.github.dev`,
            'http://localhost:5173',
        ]
        : 'http://localhost:5173',
}));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.get('/api/users/', async (_req, res, next) => {
    try {
        res.json(await models_1.User.find().sort({ username: 1 }));
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/teams/', async (_req, res, next) => {
    try {
        res.json(await models_1.Team.find().sort({ name: 1 }));
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/activities/', async (_req, res, next) => {
    try {
        res.json(await models_1.Activity.find().sort({ activityDate: -1 }));
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/leaderboard/', async (_req, res, next) => {
    try {
        res.json(await models_1.Leaderboard.find().sort({ rank: 1 }));
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/workouts/', async (_req, res, next) => {
    try {
        res.json(await models_1.Workout.find().sort({ title: 1 }));
    }
    catch (error) {
        next(error);
    }
});
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});
async function startServer() {
    await (0, database_1.connectDatabase)();
    app.listen(port, () => {
        const codespaceName = process.env.CODESPACE_NAME;
        const baseUrl = codespaceName
            ? `https://${codespaceName}-8000.app.github.dev`
            : `http://localhost:${port}`;
        console.log(`OctoFit backend running on ${baseUrl}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start OctoFit backend:', error);
    process.exit(1);
});

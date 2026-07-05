import express from 'express';
import { connectDatabase } from './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users/', async (_req, res, next) => {
  try {
    res.json(await User.find().sort({ username: 1 }));
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_req, res, next) => {
  try {
    res.json(await Team.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_req, res, next) => {
  try {
    res.json(await Activity.find().sort({ activityDate: -1 }));
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_req, res, next) => {
  try {
    res.json(await Leaderboard.find().sort({ rank: 1 }));
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_req, res, next) => {
  try {
    res.json(await Workout.find().sort({ title: 1 }));
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

async function startServer() {
  await connectDatabase();

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

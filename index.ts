import dotenv from 'dotenv';
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

dotenv.config({ path: envFile });

import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import errorMiddleware from './middleware/errorMiddleware';
import authRouter from './routers/index';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';

const app: Express = express();

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    })
  );
}

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/api', authRouter);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startApp();

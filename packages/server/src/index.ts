import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { notFound, catchErrors } from './middlewares/errors';
import users from './routes/users';
import offers from './routes/offers';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('trust proxy', 1);

const origin =
  process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:3000';

app.use(
  cors({
    credentials: true,
    origin,
  }),
);

app.use('/api/users', users);
app.use('/api/offers', offers);

app.use(notFound);
app.use(catchErrors);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running');
});

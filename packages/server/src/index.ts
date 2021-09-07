import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', (req, res) => {
  return res.json('user');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running');
});

import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

import usersRoutes from './routes/users.routes';
import clientRoutes from './routes/clients.routes';
import authRoutes from './routes/auth.routes';

import './db';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json('welcome');
});

app.use('/api/clients', clientRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

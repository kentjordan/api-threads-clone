import 'dotenv/config';
import './global';
import express, { json } from 'express';
import { default as usersRouter } from '~/modules/users/users.router';
import { default as threadsRouter } from '~/modules/threads/threads.router';
import { default as authRouter } from '~/modules/auth/auth.router';
import errorMiddleware from './middlewares/error';

const server = express();

// Middlewares
server.use(json());

// Routes
server.use('/auth', authRouter);
server.use('/users', usersRouter);
server.use('/threads', threadsRouter);

// Error handler
server.use(errorMiddleware);

server.listen(process.env.API_PORT, () => {
    console.log('Server is started on PORT:', process.env.API_PORT);
});
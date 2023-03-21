import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import rockRouter from './routes/rockRouter.js';
import loginRouter from './routes/loginRouter.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import authController from './controllers/authController';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

// const { Request, Response, NextFunction } = require('express');

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.use('/', loginRouter);
// app.use('/rock', rockRouter);

// const loginRouter = express.Router();

app.post('/login', authController.auth, (req: Request, res: Response) => {
  // const { username, password } = req.body;
  // first want to see if username is in database
  // if it is, we return the hashed password and user id from the db
  // bcrypt.compare the two passwords
  // if passwords match, create a jwt with the user id stored in it
  console.log('in login');
  const payload = { userID: 1 };
  console.log('secret key', process.env.SECRET_KEY);
  const token = jwt.sign(
    payload,
    process.env.SECRET_KEY,
    {
      expiresIn: '1d',
    }
    // function (err: Error, token: string) {
    //   console.log('err', err);
    //   console.log('token', token);
    // }
  );
  console.log('jwt set');
  res.cookie('token', token, {
    maxAge: 8.64e7,
    httpOnly: true,
  });
  console.log('cookie set');
  return res.status(200).json({ token: token });
});

app.post('/create', authController.userCheck, authController.createUser, (req: Request, res: Response, next: NextFunction) => {
  console.log('made it');
  res.sendStatus(201);
})




// catch-all route handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).send('Page Not Found');
});

type Message = { err: string };
type ServerError = { log: string; status: number; message: Message };

// global error handler
app.use(
  '/',
  (err: ServerError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An unknown error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log('error', errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(3000, () => {
  console.log('Server listening on Port 3000');
});

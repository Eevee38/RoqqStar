import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
// import rockRouter from './routes/rockRouter.js';
// import loginRouter from './routes/loginRouter.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import authController from './controllers/authController';
import bcrypt from 'bcrypt';
import db from './db';
import * as dotenv from 'dotenv';
dotenv.config();

// const { Request, Response, NextFunction } = require('express');

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.use('/', loginRouter);
// app.use('/rock', rockRouter);

// const loginRouter = express.Router();

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // first want to see if username is in database
  const queryString = 'SELECT password, _id FROM Users WHERE username = ($1);';
  const params = [];
  params.push(username);
  // if it is, we return the hashed password and user id from the db
  db.query(queryString, params).then((data) => {
    if (!data.rows.length) {
      console.log('username does not exist!')
      res.sendStatus(403);
    } else {
      // bcrypt.compare the two passwords
      // if passwords match, create a jwt with the user id stored in it
      console.log('password', data.rows[0].password);
      bcrypt.compare(password, data.rows[0].password).then((isSame) => {
        if (!isSame) {
          console.log('Incorrect password');
          res.sendStatus(403);
          
        } else {
          console.log('password matches');
          const payload = { userID: data.rows[0]._id };
          // console.log('secret key', process.env.SECRET_KEY);
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
      }
    })
  }
})

});

app.post('/create', authController.userCheck, authController.createUser, (req: Request, res: Response, next: NextFunction) => {
  console.log('made it');
  res.sendStatus(201);
});

app.patch('/forgot', (req: Request, res: Response, next: NextFunction) => {
  //takes username and new password from req.body
  const { username, newPassword } = req.body;
  // hashes new password and replaces the old password in db
  const saltRounds = 10;
  bcrypt.hash(newPassword, saltRounds).then((hash) => {
    const queryString = 'UPDATE Users SET password = ($1) WHERE username = ($2);';
    const params = [];
    params.push(hash, username);
    db.query(queryString, params).then((data) => {
      console.log('data after updating password', data);
      res.status(200).send('password updated succesfully!')
    })
    .catch((err) => {
      console.log('err', err)
    })
  })
  .catch((err) => {
    console.log('err', err)
  })

});

// get all of users entries from entries table
app.get('/rocks', authController.auth, (req: Request, res: Response) => {
  console.log('locals', res.locals.token);
  // have to change this to be what is in aria's db
  const queryString = 'SELECT name, location, description FROM Entries INNER JOIN Users ON Entries.user_id = ($1);';
  const params = [res.locals.token];
  db.query(queryString, params).then((data) => {
    res.status(200).json({ items: data.rows });
  }).catch((err) => {
    console.log('err in get rocks', err);
  })
});

// // add a new rock(entry) to entries table
// app.post('/', (req: Request, res: Response) => {});




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

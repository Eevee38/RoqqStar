// import express, { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const loginRouter = express.Router();

// loginRouter.post('/login', (req: Request, res: Response) => {
//   // const { username, password } = req.body;
//   // first want to see if username is in database
//   // if it is, we return the hashed password and user id from the db
//   // bcrypt.compare the two passwords
//   // if passwords match, create a jwt with the user id stored in it
//   const payload = { userID: 1 };
//   const token = jwt.sign(payload, process.env.SECRET_KEY, {
//     expiresIn: '1d',
//   });

//   res.cookie('token', token, {
//     maxAge: 8.64e7, // max age is 1 day
//   });
//   return res.status(200).json({ token: token });
// });

// loginRouter.post('/create', (req: Request, res: Response) => {});

// loginRouter.post('/reset', (req: Request, res: Response) => {});

// export default loginRouter;

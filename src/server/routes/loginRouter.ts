import express, { Request, Response, NextFunction } from 'express';

const loginRouter = express.Router();

loginRouter.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // first want to see if username is in database
  // if it is, we get the hashed password from the db
  // bcrypt.compare the two passwords
});

loginRouter.post('/create', (req: Request, res: Response) => {});

loginRouter.post('/reset', (req: Request, res: Response) => {});

export default loginRouter;

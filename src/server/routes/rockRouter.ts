import express, { Request, Response, NextFunction, query } from 'express';
import db from '../db';

const rockRouter = express.Router();

// get all of users entries from entries table
rockRouter.get('/', (req: Request, res: Response) => {});

// add a new rock(entry) to entries table
rockRouter.post('/', (req: Request, res: Response) => {
  const { name, image, location, description } = req.body;
  const queryString =
    'INSERT INTO Entries (rock_name, description, location, user_id) VALUES (($1), ($2), ($3), ($4));';
  const params = [];
  params.push(name, description, location, image);
  db.query(queryString, params)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log('err posting rock', err);
    });
});

// update existing rock entry in entries table
rockRouter.patch('/', (req: Request, res: Response) => {});

// delete an entry from entries table
rockRouter.delete('/', (req: Request, res: Response) => {});

export default rockRouter;

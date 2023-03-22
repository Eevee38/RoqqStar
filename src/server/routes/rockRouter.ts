import express, { Request, Response, NextFunction } from 'express';
import authController from '../controllers/authController';
import db from '../db';

const rockRouter = express.Router();

// get all of users entries from entries table
rockRouter.get(
  '/',

  authController.auth,
  (req: Request, res: Response) => {
    const queryString = 'SELECT * FROM Rock_Entries';
    db.query(queryString, [])
      .then((data) => {
        // this console.log doesnt work
        console.log('res token', res.locals.token);
        console.log('data from GET rocks', data.rows);
        res.status(200).json({ rows: data.rows });
      })
      .catch((err) => {
        console.log('error in get rocks', err);
      });
  }
);

// add a new rock(entry) to entries table
rockRouter.post('/', authController.auth, (req: Request, res: Response) => {
  const { name, image, location, description } = req.body;
  const queryString =
    'INSERT INTO Rock_Entries (rock_name, image, description, location, user_id) VALUES (($1), ($2), ($3), ($4), ($5)) RETURNING *;';
  const params = [];
  // res.locals.token from authController.auth is the userID (undefined)
  params.push(name, image, description, location, res.locals.token);
  db.query(queryString, params)
    // 'data' doesn't show anything for INSERT queries
    // when we INSERT a row, how does the frontend know to re-render?
    .then((data) => {
      console.log('this is data in post', data);
      res.status(201).json({ data: data });
    })
    .catch((err) => {
      console.log('err posting rock', err);
    });
});

// update existing rock entry in entries table
rockRouter.patch('/', authController.auth, (req: Request, res: Response) => {
  // grab key from component (technically key + 1?)
  const { image, description, key } = req.body;
  const queryString =
    'UPDATE Rock_Entries SET image = ($1), description = ($2) WHERE entry_id = ($3) RETURNING *;';
  const params = [image, description, key];
  db.query(queryString, params)
    .then((data) => {
      // data here also gives nothing valuable
      console.log('data in patch', data);
      res.status(200).json({ data: data });
    })
    .catch((err) => {
      console.log('err patching rock', err);
    });
});

// delete an entry from entries table
rockRouter.delete('/', authController.auth, (req: Request, res: Response) => {
  const { key } = req.body;
  const queryString = `DELETE FROM Rock_Entries WHERE entry_id = ($1) RETURNING *`;
  const params = [];
  params.push(key);
  db.query(queryString, params)
    .then((data) => {
      console.log('data in delete', data);
      res.status(200).json({ data: data });
    })
    .catch((err) => {
      console.log('err deleting rock', err);
    });
});

export default rockRouter;

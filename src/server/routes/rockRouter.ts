import express, { Request, Response, NextFunction } from 'express';

const rockRouter = express.Router();

// get all of users entries from entries table
rockRouter.get('/', (req: Request, res: Response) => {});

// add a new rock(entry) to entries table
rockRouter.post('/', (req: Request, res: Response) => {});

// update existing rock entry in entries table
rockRouter.patch('/', (req: Request, res: Response) => {});

// delete an entry from entries table
rockRouter.delete('/', (req: Request, res: Response) => {});

export default rockRouter;

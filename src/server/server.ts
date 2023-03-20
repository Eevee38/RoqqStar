import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import path from 'path';
import rockRouter from './routes/rockRouter';
import loginRouter from './routes/loginRouter';

const app = express();
app.use(express.json());

app.use('/', loginRouter);
app.use('/rock', rockRouter);

app.use('*', (req: Request, res: Response) => {
  res.status(404).send('Page Not Found');
});

type Message = { err: string };
type ServerError = { log: string; status: number; message: Message };

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

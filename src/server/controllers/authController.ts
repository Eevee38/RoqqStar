import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db';
import bcrypt from 'bcrypt';

type Controller = { auth: RequestHandler, userCheck: RequestHandler, createUser: RequestHandler};

const authController: Controller = { 
    auth : (req: Request, res: Response, next: NextFunction) => {
    console.log('hi');
    return next();
    // check if token on cookie is valid 
    // jwt.verify(token, process.env.SECRET_KEY)
    },
    userCheck : (req: Request, res: Response, next: NextFunction) => {
        const { username, password, email } = req.body;
  // ensure that username and email are not already being used
  const queryString = 'SELECT username FROM Users WHERE username = ($1);';
  const params = [];
  params.push(username);
  db.query(queryString, params)
    .then((data) => {
      if (data.rows.length) {
        console.log('data', data);
        console.log('username already exists');
        res.sendStatus(400)
      } else {
      const queryString = 'SELECT email FROM Users WHERE email = ($1);';
      const params = [];
      params.push(email);
      db.query(queryString, params)
      .then((data) => {
        if (data.rows.length) {
          console.log('email already in use');
          res.sendStatus(400);
        } else {
            res.locals.user = { username, password, email };
            return next();
        }
      })
      }
    })
    .catch((err) =>
    console.log(err)
  )
    },
    createUser : (req: Request, res: Response, next: NextFunction) => {
       const { username, password, email } = res.locals.user;
       const saltRounds = 10;
       console.log('about to hash');
       bcrypt.hash(password, saltRounds).then((hash) => {
        //query db here
        const dbQuery = 'INSERT INTO Users (username, password, email) VALUES (($1), ($2), ($3));';
        const params = [];
        params.push(username, hash, email);
        db.query(dbQuery, params).then((data) => {
            console.log('data', data);
            return next();
        }).catch((err) => {
            console.log('err', err);
        })
       }).catch((err) => {
        console.log('err', err);
       })
    },
};

export default authController;
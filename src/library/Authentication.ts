import jwt from 'jsonwebtoken';
import {VerifyErrors} from 'jsonwebtoken';
import * as dotenv from "dotenv";
import {Express, Request, Response, NextFunction} from 'express';
import { IUser } from '../model/User';
dotenv.config();



const userAuthenticate = (req: Request, res: Response, next: NextFunction) =>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401);

  const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN;
  if(!accessTokenSecret){
    return res
    .status(500)
    .json({
      error:
        "Something went wrong",
    });
  }

  jwt.verify(token, accessTokenSecret, (err: VerifyErrors | null, user: any)=>{
    if(err) return res.sendStatus(403);
    req.body.user = user;
    next()
  })

}

const adminAuthenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) {
    
    res.sendStatus(401);
    return
  }

  const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN;
  if(!accessTokenSecret){
    res
    .status(500)
    .json({
      error:
        "Something went wrong",
    });
    return
  }

  jwt.verify(token, accessTokenSecret, (err: VerifyErrors | null, user: any)=>{
    if(err) return res.sendStatus(403);
    if(user.role != 'admin') return res.sendStatus(403);
    req.body.user = user;
    next()
  })

}

export default {userAuthenticate, adminAuthenticate}
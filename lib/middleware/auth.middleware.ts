import { Request, Response} from 'express';
import { User } from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import {configVars} from '../config/config';

let authenticate = (req: Request, res: Response, next: Function) =>{
    let token: string = req.header('x-auth');
    let payload;

    try{
        payload = jwt.verify(token, configVars.SECRET ); 
        User.findOne({
            '_id': payload._id,
            'tokens.token': token
        }).then((user)=> {
            if(!user) throw new Error();
            
            req.body.user = user;
            req.body.token = token;
            next();
        }).catch((e) => res.status(401).send(e)) 
    } 
    catch{
        return res.status(401).send();
    }   
}

export default authenticate;
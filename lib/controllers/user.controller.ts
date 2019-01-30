import { Request, Response } from 'express';
import { User } from '../models/user.model'
import * as _ from 'lodash';

// export const User = mongoose.model('User', UserSchema);

export class UserController{
    public addNewUser = (req: Request, res: Response) =>{
        let user = new User(req.body);

        user.generateAuthToken()
            .then((token) => res.header('x-auth', token).send(user))
            .catch(e => res.status(400).send(e));
    }

    public getUsers = (req: Request, res: Response)=>{
        User.find()
            .then( users=> res.json(users))
            .catch(e => res.status(400).send(e));
    }

    public getUserbyId = (req: Request, res: Response)=>{
        User.findById(req.params.userId)
            .then( user => {
                if(!user) return res.status(404).send();
                res.json(user)})
            .catch( e => res.status(400).send(e) )
    }

    public updateUser = (req: Request, res: Response)=>{
        User.findOneAndUpdate({
            _id: req.params.userId
        }, req.body, { new: true})
            .then(user => {
                if(!user) return res.status(404).send();
                res.json(user)})
            .catch(e => res.status(400).send(e));
    }

    public deleteUser = (req: Request, res: Response)=>{ 
        User.findOneAndDelete({
            _id: req.params.userId
        })
            .then((user)=> {
                if(!user) return res.status(404).send();
                res.json({ message: 'User successfully deleted', user})})
            .catch( e => res.status(400).send(e));
    }

    public loginUser = (req: Request, res: Response)=>{
        let body = _.pick(req.body, ['email', 'password']);
        
        User.findOne({email: body.email})
            .then( user => {
                if(user && user.password === body.password) {
                    return user.generateAuthToken()
                                .then((token) => res.header('x-auth', token).send(user))
                                .catch(e => res.status(400).send(e));
                }
                throw new Error()
            }).catch(e => res.status(401).send());
    }

    public logoutUser = (req: Request, res: Response)=> {
        req.body.user.updateOne({
            $pull: {
                tokens: {token: req.body.token}
            }
        }).then(()=> res.send())
          .catch(()=> res.status(400).send());
    }
}

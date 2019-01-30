import { Request, Response } from 'express';
import { UserController } from './controllers/user.controller';
import authenticate from './middleware/auth.middleware';

export class Routes{
    public userController: UserController = new UserController();

    public routes(app): void{

        app.route('/user')
            .get(authenticate, this.userController.getUsers)
            .post(this.userController.addNewUser)

        app.route('/user/me')
            .get(authenticate,(req: Request, res: Response)=> {res.status(200).send({ user: req.body.user})})

        app.route('/user/:userId')
            .get(authenticate, this.userController.getUserbyId)
            .put(authenticate, this.userController.updateUser) 
            .delete(authenticate, this.userController.deleteUser)

        app.route('/login')
            .post(this.userController.loginUser)
        
        app.route('/logout')
            .delete(authenticate, this.userController.logoutUser)            
    }
}
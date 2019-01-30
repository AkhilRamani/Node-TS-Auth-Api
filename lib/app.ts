import * as express from 'express';
import * as bodyParser from "body-parser";
import { Routes } from './Routes';
import * as mongoose from 'mongoose';
import {dbconfig} from './dbconfig'

class App{

    public app: express.Application;
    public routePrv: Routes = new Routes();
   // public mongoUrl: string = 'mongodb://zujo-task:zujo-task123@ds111455.mlab.com:11455/zujo-task1';
   public mongoUrl: string = `mongodb://${dbconfig.username}:${dbconfig.password}@ds111455.mlab.com:11455/zujo-task1`;
    constructor(){
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));   //support application/x-www-form-urlencoded post data
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}

export default new App().app;

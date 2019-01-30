"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const Routes_1 = require("./Routes");
const mongoose = require("mongoose");
const dbconfig_1 = require("./dbconfig");
class App {
    constructor() {
        this.routePrv = new Routes_1.Routes();
        // public mongoUrl: string = 'mongodb://zujo-task:zujo-task123@ds111455.mlab.com:11455/zujo-task1';
        this.mongoUrl = `mongodb://${dbconfig_1.dbconfig.username}:${dbconfig_1.dbconfig.password}@ds111455.mlab.com:11455/zujo-task1`;
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false })); //support application/x-www-form-urlencoded post data
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map
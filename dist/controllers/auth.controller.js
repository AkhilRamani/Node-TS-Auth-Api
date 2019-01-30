"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
class Auth {
    constructor() {
        this.generateToken = (userId) => {
            return jwt.sign({ _id: userId.toHexString() }, config_1.configVars.SECRET).toString();
        };
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.controller.js.map
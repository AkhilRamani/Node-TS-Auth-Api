"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
let authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    let payload;
    try {
        payload = jwt.verify(token, config_1.configVars.SECRET);
        user_model_1.User.findOne({
            '_id': payload._id,
            'tokens.token': token
        }).then((user) => {
            if (!user)
                throw new Error();
            req.body.user = user;
            req.body.token = token;
            next();
        }).catch((e) => res.status(401).send(e));
    }
    catch (_a) {
        return res.status(401).send();
    }
};
exports.default = authenticate;
//# sourceMappingURL=auth.middleware.js.map
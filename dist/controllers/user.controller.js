"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const _ = require("lodash");
// export const User = mongoose.model('User', UserSchema);
class UserController {
    constructor() {
        this.addNewUser = (req, res) => {
            let user = new user_model_1.User(req.body);
            user.generateAuthToken()
                .then((token) => res.header('x-auth', token).send(user))
                .catch(e => res.status(400).send(e));
        };
        this.getUsers = (req, res) => {
            user_model_1.User.find()
                .then(users => res.json(users))
                .catch(e => res.status(400).send(e));
        };
        this.getUserbyId = (req, res) => {
            user_model_1.User.findById(req.params.userId)
                .then(user => {
                if (!user)
                    return res.status(404).send();
                res.json(user);
            })
                .catch(e => res.status(400).send(e));
        };
        this.updateUser = (req, res) => {
            user_model_1.User.findOneAndUpdate({
                _id: req.params.userId
            }, req.body, { new: true })
                .then(user => {
                if (!user)
                    return res.status(404).send();
                res.json(user);
            })
                .catch(e => res.status(400).send(e));
        };
        this.deleteUser = (req, res) => {
            user_model_1.User.findOneAndDelete({
                _id: req.params.userId
            })
                .then((user) => {
                if (!user)
                    return res.status(404).send();
                res.json({ message: 'User successfully deleted', user });
            })
                .catch(e => res.status(400).send(e));
        };
        this.loginUser = (req, res) => {
            let body = _.pick(req.body, ['email', 'password']);
            user_model_1.User.findOne({ email: body.email })
                .then(user => {
                if (user && user.password === body.password) {
                    return user.generateAuthToken()
                        .then((token) => res.header('x-auth', token).send(user))
                        .catch(e => res.status(400).send(e));
                }
                throw new Error();
            }).catch(e => res.status(401).send());
        };
        this.logoutUser = (req, res) => {
            req.body.user.updateOne({
                $pull: {
                    tokens: { token: req.body.token }
                }
            }).then(() => res.send())
                .catch(() => res.status(400).send());
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const _ = require("lodash");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        required: 'Last name is required'
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true
    },
    phone: {
        type: Number
    },
    created_Date: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        required: 'Password is required',
        minlength: 6
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
});
UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let token = jwt.sign({ _id: user._id.toHexString() }, config_1.configVars.SECRET).toString();
    user.tokens.push({ token });
    return user.save().then(() => {
        return token;
    });
};
UserSchema.methods.toJSON = function () {
    let user = this;
    return _.pick(user.toObject(), ['_id', 'email', 'firstName', 'lastName', 'phone']);
};
//export default UserSchema;
exports.User = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map
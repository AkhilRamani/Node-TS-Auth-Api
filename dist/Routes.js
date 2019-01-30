"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./controllers/user.controller");
const auth_middleware_1 = require("./middleware/auth.middleware");
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        app.route('/user')
            .get(auth_middleware_1.default, this.userController.getUsers)
            .post(this.userController.addNewUser);
        app.route('/user/me')
            .get(auth_middleware_1.default, (req, res) => { res.status(200).send({ user: req.body.user }); });
        app.route('/user/:userId')
            .get(auth_middleware_1.default, this.userController.getUserbyId)
            .put(auth_middleware_1.default, this.userController.updateUser)
            .delete(auth_middleware_1.default, this.userController.deleteUser);
        app.route('/login')
            .post(this.userController.loginUser);
        app.route('/logout')
            .delete(auth_middleware_1.default, this.userController.logoutUser);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map
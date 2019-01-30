"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'get Request by Akhil'
            });
        });
        app.route('/user')
            .get((req, res) => {
            res.status(200).send({
                message: 'Contect Request'
            });
        })
            .post((req, res) => {
            res.status(200).send({
                message: 'post request successful'
            });
        });
        app.route('/user/:userId')
            .get((req, res) => {
            res.status(200).send({
                message: 'Get request user/:userid'
            });
        })
            .put((req, res) => {
            res.status(200).send({
                message: 'Put Req: Update'
            });
        })
            .delete((req, res) => {
            res.status(200).send({
                message: 'DELETE request successfulll!!!!'
            });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map
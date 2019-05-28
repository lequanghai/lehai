const groupController = require('../controlers/group');
const { verifyToken } = require('../middlewares/authentication');



exports.load = function(app) {
    app.post('/api/v1/groups', [ verifyToken ], groupController.create);

}
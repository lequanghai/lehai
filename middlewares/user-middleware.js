
const { ObjectId } = require('mongodb');
const createUser = (req, res, next) => {
    if (!req.body.username) {
        return next(new Error('require_username'));
    }
    if (!req.body.password) {
        return next(new Error('require_password'));
    }
    return next();
    };
const  updateUser = (req, res, next) => {
    if (ObjectId.isValid(req.params.id) !== true) {
        return next (new Error('require_id_is_object_id'));
    }
    if (!req.body){
        return next (new Error('require_data_update'));
    }
    return next();
};

    
const  getOneUser = (req, res, next) => {
    if (ObjectId.isValid(req.params.id) !== true) {
        return next (new Error('require_id_is_object_id'));
    }
    return next();
    };
    
 const  deleteUser = (req, res, next) => {
    if (ObjectId.isValid(req.params.id) !== true) {
        return next (new Error('require_id_is_object_id'));
    }
    return next();}
    
module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    getOneUser: getOneUser,
    deleteUser: deleteUser
};

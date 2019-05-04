module.exports = { createUser : function (req, res, next) {
    if (!req.body.username) {
        return next(new Error('require_username'));
    }
    if (!req.body.password) {
        return next(new Error('require_password'));
    }
    return next();
    },
    updateUser : (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return next (new Error('require_id_is_number'));
    }
    if (!req.body){
        return next (new Error('require_data_update'));
    }
    return next();
    },
    
    getUser : (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return next (new Error('require_id_is_number'));
    }
    return next();
    },
    
    deleteUser : (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return next (new Error('require_id_is_number'));
    }
    return next();
    }
    
}

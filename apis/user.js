
const userValidation = require('../validations/user');
const userController = require('../controlers/user');
const validation = require('express-validation');
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    username: Joi.string().required().min(3).max(20),
    password: Joi.string().required().min(3).max(20)
    // access_token: [Joi.string(), Joi.number()],
    // birthyear: Joi.number().integer().min(1900).max(2013),
    // email: Joi.string().email({ minDomainSegments: 2 })
})//.with('username', 'birthyear').without('password', 'access_token');
exports.load = function(app) {
    app.get('/api/v1/users', userController.getUser)
	app.post('/api/v1/users', validation(userValidation.createUser()), userController.createUser)
	app.delete('/api/v1/users/:id', validation(userValidation.deleteUser()), userController.deleteUser)
	app.put('/api/v1/users/:id', validation(userValidation.updateUser()), userController.updateUser)
	app.get('/api/v1/users/:id', validation(userValidation.getOneUser()), userController.getOneUser)
}
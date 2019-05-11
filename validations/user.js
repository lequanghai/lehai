
const { ObjectId } = require('mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const createUser = () => {
   return {
       body:{
            username: Joi.string().min(6).max(30).required(),
            password: Joi.string().min(6).max(30).required()
       }
   }
    
};
const  updateUser = () => {
    return {
        query: {
            id: Joi.objectId()
        },
        body: {
            username: Joi.string().min(6).max(30).required(),
            password: Joi.string().min(6).max(30).required()
        },
       
    }
};

    
const getOneUser = ()  => {
    return {
        query:{
            id: Joi.objectId()
        }
        // access_token: [Joi.string(), Joi.number()],
        // birthyear: Joi.number().integer().min(1900).max(2013),
        // email: Joi.string().email({ minDomainSegments: 2 })
        };
    }
    
const  deleteUser = () => {
   return {
       query:{
           id: Joi.objectId()
       }
    }
}
    
    
module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    getOneUser: getOneUser,
    deleteUser: deleteUser
};

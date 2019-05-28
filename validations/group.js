const Joi = require('joi');
const createUser = () => {
   return {
    body:{
        name: Joi.string().min(6).max(30).required(),
        author: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
   }
}
    
};
const  updateUser = () => {
    return {
        // query: {
        //     _id : Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        // },
        // body: {
        //     username: Joi.string().min(6).max(30).required(),
        //     password: Joi.string().min(6).max(30).required()
        // },
       
    }
};

    
const getOneUser = ()  => {
    return {
        query:{
            _id : Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        }
        // access_token: [Joi.string(), Joi.number()],
        // birthyear: Joi.number().integer().min(1900).max(2013),
        // email: Joi.string().email({ minDomainSegments: 2 })
        };
    }
    
const  deleteUser = () => {
   return {
       query:{
        _id : Joi.string().regex(/^[0-9a-fA-F]{24}$/)
       }
    }
}
    
    
module.exports = {
    createUser,
    updateUser,
    getOneUser,
    deleteUser
};

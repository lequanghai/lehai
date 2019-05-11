
const { ObjectId } = require('mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const createProduct = () => {
   return {
       body:{
            name: Joi.string().min(6).max(30).required(),
            userId: Joi.objectId(),
            colors: Joi.array().items(Joi.string().required()),
            price: Joi.number().integer().min(0).max(10000),
            isAvailable: Joi.boolean().invalid(0),
            // payload: Joi.object({
            //     expiredAt: Joi.date,
		    //     releasedAt: Joi.date
            // }),
       }
   }
    
};
const  updateProduct = () => {
    return {
        query: {
            id: Joi.objectId()
        },
        body:{
            name: Joi.string().min(6).max(30).required(),
            userId: Joi.objectId(),
            colors: Joi.array().items(Joi.string().required()),
            price: Joi.number().integer().min(0).max(10000),
            isAvailable: Joi.boolean().invalid(0),
            payload: Joi.object().keys({
                expiredAt: Joi.date().iso(),
		        releasedAt: Joi.date().iso(),
            }).with('expiredAt', 'releasedAt'),
       }
       
    }
};

    
const getOneProduct = ()  => {
    return {
        query:{
            id: Joi.objectId()
        }
        // access_token: [Joi.string(), Joi.number()],
        // birthyear: Joi.number().integer().min(1900).max(2013),
        // email: Joi.string().email({ minDomainSegments: 2 })
        };
    }
    
const  deleteProduct = () => {
   return {
       query:{
           id: Joi.objectId()
       }
    }
}
    
    
module.exports = {
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getOneProduct: getOneProduct,
};

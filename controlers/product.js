const Product = require('../models/product');
const User = require('../models/user')
exports.create = async (req, res, next) => {
    try {
        const {
            name,
            userId,
            price,
            color,
            isAvailable,
            payload
        } = req.body;
        const existedUser = await User.findById(userId);
        if (!existedUser) {
            return next(new Error('USER_NOT_FOUND'));
        }
        const existedProduct = await Product.findOne({name});
        if (existedProduct) {
            return next(new Error('Product_already_existed'))
        }
        const product = new Product ({
            ...req.body
        })
        const savedProduct = await product.save();
        return res.status(200).json({
            message: 'Create new product successfully',
            savedProduct
        });
    } catch (e) {
        return next(e);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const products = await Product.find();

        for (const product of products) {
            const userId = product.userId
            const user = await User.findById(userId)
            if (user) {
                product.users = user;
            }
        }
        return res.status(200).json({
            products
        });
    } catch (e) {
        return next(e);
    }
};

exports.update = async (req, res, next) => {
    try {
        const  id  = req.params.id;
        const {
            name,
            userId,
            price,
            color,
            isAvailable,
            payload
        } = req.body;
        const existedUser = await User.findById(userId);
        if (!existedUser) {
            return next(new Error('UserId_does_not_exist'));
        }
        const _product = await Product.findById(id);
        if (!_product) {
            return next(new Error('Name_of_product_already_exist'));
        }
        const newValues = _product;
        if (name !== undefined) {
            newValues.name = name;
        }
        if (userId !== undefined) {
            newValues.userId = userId;
        }
        if (price !== undefined) {
            newValues.price = price;
        }
        if (color !== undefined) {
            newValues.color = color;
        }
        if (isAvailable !== undefined) {
            newValues.isAvailable = isAvailable;
        }
        if (payload !== undefined) {
            newValues.payload = payload;
        }
        
    //     Object.keys(newValues).forEach( function(key) {
    //         if (newValues[key] === undefined) {
    //             delete newValues[key];
    //         }
    //     });
        //const updateInfo = {$set: newValues};
        updatingProduct = await Product.findByIdAndUpdate(id, newValues);
        if (!updatingProduct) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }

        return res.status(200).json({
            message: 'Update product successfully',
            oldData:updatingProduct,
            dataChanges: _product
        });
    } catch (e) {
        return next(e);
    }
};
exports.getProduce = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }
        const id = product.userId;
        const user = await User.findById(id);
        product.users = user;
        return res.status(200).json({
            message : 'product ',
            data: product
        });
    } catch (e) {
        return next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
		console.log(product);
        if (!product) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }
        return res.status(200).json({
			message: 'Delete _id ' + productId + ' successfully!'
        });


   
    } catch (e) {
        return next(e);
    }
};
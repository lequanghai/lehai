const { ObjectId } = require('mongodb');

exports.create = async (req, res, next) => {
    try {
        const body = req.body;
        // check if user not existed
        const userId = body.userId
        const userCollection = req.db.collection('users');
        const existedUser = await userCollection.findOne({
            _id: ObjectId(userId)
        });
        if (!existedUser) {
            return next(new Error('USER_NOT_FOUND'));
        }
        const productCollection = req.db.collection('products');
        const data = await productCollection.insertOne(body);
        return res.json({
            message: 'Create new product successfully',
            data: data.ops[0]
        });
    } catch (e) {
        return next(e);
        
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const productCollection =req.db.collection('products');
        const products = await productCollection.find().toArray();
        return res.json({
            products
        })
    } catch (e) {
        return next(e);
    }
};

exports.update = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const body = req.body;
        const newProduct = {$set: body};
        const product = await req.db.collection('products').findOne({
        _id:  ObjectId(productId)
        });
		
        if (!product) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }

        req.db.collection('products').updateOne({
        _id:  ObjectId(productId)
		}, newProduct)
        return res.status(200).json({
            message : 'update product succesful',
            data: newProduct
        });
    } catch (e) {
        return next(e);
    }
};
exports.getProduce = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await req.db.collection('products').findOne({
        _id:  ObjectId(productId)
        });
		
        if (!product) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }

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
        const productCollection = req.db.collection('products');
        const product = await productCollection.findOne({
        _id:  ObjectId(productId)
        });
		
        if (!product) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }

        productCollection.remove({
        _id:  ObjectId(productId)
		});
        
        return res.json({
			message: 'Delete _id ' + productId + ' successfully!'
		});
   
   
    } catch (e) {
        return next(e);
    }
};
const productController = require('../controlers/product');
const productValidation = require('../validations/product') 
const validate = require('express-validation');

exports.load = function(app) {
    app.post('/api/v1/products', validate(productValidation.createProduct()), productController.create);
    app.get('/api/v1/products', productController.getAll);
    app.put('/api/v1/products/:id', validate(productValidation.updateProduct()), productController.update);
    app.delete('/api/v1/products/:id', validate(productValidation.deleteProduct()), productController.delete);
    app.get('/api/v1/products/:id', validate(productValidation.getOneProduct()), productController.getProduce);
}
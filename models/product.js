const { mongoose } = require('./index');
const User = require('./user')
const Productschema = new mongoose.Schema({
     name: {
        type: String,
        min: 3,
        max: 30,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        min: 1000,
        max: 100000000,
        required: true
    },
    color: [{
        type: String,
        required: true
    }],
    isAvailable: {
        type: Boolean,
        default: true
    },
    payload: {
        releasedAt: {
            type: Date,
            min: ('now'),
            required: true
        },
        expiredAt: {
            type: Date,
           required: true
        },
        
    },
    users:{
       
    }

})

const Product = mongoose.model('Product', Productschema)

module.exports = Product;
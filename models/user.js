const { mongoose } = require('./index');

const Userschema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max: 30,
        required: true,
    },
    password: {
        type: String,
        min: 3,
        max: 30,
        required: true,
    },
})

const User = mongoose.model('User', Userschema)

module.exports = User;
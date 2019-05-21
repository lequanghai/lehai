const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken');
const { sign } = require('../helpers/jwt-helper');
const deleteUser = async (req, res, next) => { // API delete one user
	try {
        const userId = req.params.id;
		const user = await User.findByIdAndDelete(userId).lean();
		if (!user) {
			return next(new Error('USER_NOT_FOUND'));
		}
		return res.json({
			message: 'Delete _id ' + userId + ' successfully!'
		});
		
	} catch(e) {
		return next(e);
	}
};
const createUser = async (req, res, next) => { // API create new user
	try {
		const  {
			username,
			password
		} = req.body
		const salt = bcrypt.genSaltSync(2)
		const hashpassword = bcrypt.hashSync(password, salt)
		const newUser = new User({
			username,
			password: hashpassword
		});
		const user = await User.findOne({ username: req.body.username }).lean()
		if (user) {
			return next(new Error('user ton tai'))
		}
		const data = await newUser.save();
		delete data._doc.password;
		return res.status(201).json({
			message : 'add user succesful',
			data: data
		});
	} catch(e) {
		return next(e);
	}
};

const login = async (req, res, next) => {
	try {  
		const username = req.body.username;
		const password = req.body.password;
		const user = await User.findOne({username});
		if (!user) {
			return next(new Error('not user'))
		}
		const comparepassword = bcrypt.compareSync(password, user.password)
		if (!comparepassword) {
			return next(new Error('not password'));
		}
		const expiresIn = 600;
		const privatePath = path.resolve(__dirname, '..', 'config/private.key');
		const privatekey = fs.readFileSync(privatePath, 'utf8');
		//console.log(privatekey)
		const token = jwt.sign({username}, privatekey, {expiresIn , algorithm: 'RS256'})
		console.log(token);
		return res.status(201).json({
			message : 'login user succesful',
			access_token: token
		});
	} catch(e) {
		return next(e);
	}
}

const updateUser = async (req, res, next) => {

	try {
		const _id = req.params.id;
		const body = req.body;
		if(body.password) {
			const salt = bcrypt.genSaltSync(2);
			body.password = bcrypt.hashSync(password, salt);
		}
        const updateInfo = { $set: body };
		//newUser.password = hashpassword;
		const user = await User.findByIdAndUpdate(_id,updateInfo).lean().select('-password');
		if (!user) {
            return next(new Error('USER NOT FOUND'));
		}
		return res.status(200).json({
			message : 'update user succesful',
			olduser: user,
			data: updateInfo
		});
		
	} catch (e) {
		return next(e);
	}
};

const getListUser = async (req, res, next) => { // API get list users
	try {
        const users = await User.find().lean().select('-password')
        return res.json({
            message: 'List users',
            data: users
        });

    } catch(e) {
        return next(e);
	}
};

const getOneUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
        const user = await User.findById(userId).lean().select('-password');
        if (!user) {
            return next(new Error('USER NOT FOUND'));
        }
        return res.json({
            message: 'users',
            data: user
        });

	} catch (e) {
		return next(e);
	}
};

module.exports = {
	deleteUser,
	createUser,
	updateUser,
	getOneUser,
	getListUser,
	login
	
}
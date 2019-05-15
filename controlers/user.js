const User = require('../models/user');
const Bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken');
const deleteUser = async (req, res, next) => { // API delete one user
	try {
        const userId = req.params.id;
		const user = await User.findByIdAndDelete(userId);
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
		const salt = Bcrypt.genSaltSync(2)
		const hashpassword = Bcrypt.hashSync(password, salt)
		const newUser = new User({
			username,
			password: hashpassword
		})
		const _user = await User.findOne({username: req.body.username})
		if (_user) {
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
		 console.log(username,password);
		const user = await User.findOne({username});
		if (!user) {
			return next(new Error('not user'))
		}
		console.log(user.password);
		const comparepassword = Bcrypt.compareSync(password, user.password)
		if (!comparepassword) {
			return next(new Error('ere'));
		}
		const token = jwt.sign({username}, 'shhhhh')
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
		let newUser =  {$set: req.body};
		const user = await User.findByIdAndUpdate(_id,newUser)
		if (!user) {
            return next(new Error('USER_NOT_FOUND'));
        }
		return res.status(200).json({
			message : 'update user succesful',
			user
		});
		
	} catch (e) {
		return next(e);
	}
};

const getUser = async (req, res, next) => { // API get list users
	try {
		// const token = req.query.token || req.body.token;
		// if (!token) {
		// 	return next(new Error('wewe'));
		// }
		// jwt.verify(token, 'shhhhh');
        const users = await User.find();
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
        const user = await User.findOne({_id: userId});
        if (!user) {
            return next(new Error('USER_NOT_FOUND'));
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
	getUser,
	login
	
}
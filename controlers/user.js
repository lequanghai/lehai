const User = require('../models/user');

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
	
		const user = new User({
            ...req.body
		});
		
		const _user = await User.findOne({username:req.body.username})
		if (_user) {
			return next(new Error('user ton tai'))
		}
		const data = await user.save();
		return res.status(201).json({
			data
		});
``
	} catch(e) {
		console.log(e)
		return res.status(400).json({
			message: 'Something went wrong',
			error: e
		});
	}
};

const updateUser = async (req, res, next) => {

	try {
		const userId = req.params.id;
		let newUser =  {$set: req.body};
		const user = await User.findByIdAndUpdate(userId,newUser)
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
	getUser
}
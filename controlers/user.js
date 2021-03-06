const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken');
const { sign } = require('../helpers/jwt-helper');
const sendMail = require('../nodemailer/sendmail')
const { userRepository } = require('../repositories')
const deleteUser = async (req, res, next) => { // API delete one user
	try {
		const options = {
			where: {
				_id: req.params.id
			},
			data: { $set: { deleteAt: new Date() }},
			lean: true
		}
		const user = await userRepository.findOneAndUpdate(options)
		if (!user) {
			return next(new Error('user not found'));
		}
		return res.json({
			message: 'Delete successfully!'
		});
		
	} catch(e) {
		return next(e);
	}
};
const createUser = async (req, res, next) => { // API create new user
	try {
		const salt = bcrypt.genSaltSync(2)
		const hashpassword = bcrypt.hashSync(req.body.password, salt)
		const data = {
			...req.body,
			password: hashpassword,
		};
		const user = userRepository.create(data);
		//console.log(user);
		await user.save();
		delete user._doc.password;
		return res.status(200).json({
			message : 'add user succesful',
			data: user
		});
	} catch(e) {
		return next(e);
	}
};

const login = async (req, res, next) => {
	try {  
		const { username, password } = req.body;
		const options = {
			where: { username },
			lean: true
		}
		const user = await userRepository.getOne(options);
		if (!user) {
			return next(new Error('not user'))
		}
		const comparepassword = bcrypt.compareSync(password, user.password)
		if (!comparepassword) {
			return next(new Error('not password'));
		}
		const token = sign({ _id: user.id });
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
		const body = req.body;
		if(body.password) {
			const salt = bcrypt.genSaltSync(2);
			body.password = bcrypt.hashSync(password, salt);
		}
        const options = { 
			where: { _id: req.params.id },
			data: {$set: body },
			lean: true
		}
		//newUser.password = hashpassword;
		const user = await User.findByIdAndUpdate(options);
		if (!user) {
            return next(new Error('USER NOT FOUND'));
		}
		return res.status(200).json({
			message : 'update user succesful'
		});
		
	} catch (e) {
		return next(e);
	}
};

const getListUser = async (req, res, next) => { // API get list users
	try {
		const opstions = {
			select: 'username',
			lean: true
		}
        const users = await userRepository.getAll(opstions);
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
		const options = {
			where: {
				_id: req.params.id,
			},
			select: 'username',
			lean: true
		}
		const user = await userRepository.getOne(options)
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

const forgetPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		let user = await userRepository.getOne({
			where: { email: email },
			select: '_id'
		  });
		if (!user) {
			return next(new Error('EMAIL_NOT_FOUND'));
		}
		let randomCode = Math.random().toString(36).substring(3,10).toUpperCase();
		user.codeResetPassword = randomCode;
		user.genCodeAt = new Date;
		await user.save();
		await sendMail(email, randomCode);
		return res.status(200).json({
            message: "create user  successfully",
        })
	} catch (e) {
		return next(e);
		
	}
};
const resetPassWord = async (req, res, next) =>{
	try {
		const { email, code, newPassword, confirmPassword } = req.body;
		const user = await User.findOne().where({
			codeResetPassword: code,
			email: email
		});
		if (!user) {
			return next(new Error('CANNOT_RESET_PASSWORD'));
		}
		if (new Date() - user.genCodeAt > 1000*60*30) {
            return next(new Error('CODE_EXPIRED'));       
		}
		if (newPassword !== confirmPassword) {
			return next(new Error('PASSWORD NOT THE SAME!'));
		  }
	
		const salt = bcrypt.genSaltSync(2);
		const hashPassword = bcrypt.hashSync(newPassword, salt);
		user.password = hashPassword,
		user.codeResetPassword = null;
		user.genCodeAt = null;
		user.save();
		console.log(user);
		return res.status(200).json({
            message : 'change password successful',
        });
		
	} catch (e) {
		return next(e);
	}
}

module.exports = {
	deleteUser,
	createUser,
	updateUser,
	getOneUser,
	getListUser,
	login,
	forgetPassword,
	resetPassWord
	
}
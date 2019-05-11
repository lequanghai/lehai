const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');


const deleteUser = async (req, res, next) => { // API delete one user
	try {
        const userId = req.params.id;
        const user = await req.db.collection('users').findOne({
            _id: ObjectId(userId)
        });

        if (!user) {
            return next(new Error('USER_NOT_FOUND'));
		} 
		req.db.collection('users').remove({
		_id: ObjectId(userId)
		});
		return res.json({
			message: 'Delete _id ' + userId + ' successfully!'
		});
		
			
	} catch(e) {
		return next(e);
	}
};
const createUser = async (req, res, next) => { // API create new user
	try {
		const body = req.body;
		const username = body.username;
		const password = body.password;
		const newUser = {
			username: username,
			password: password
		};
		const db = req.db;
		const collection = db.collection('users');

		user = await collection.findOne({ username })
			if (user) {
				return next(new Error('user ton tai'))
			}
			result = await collection.insertOne(newUser)
				//console.log(result);
			return res.status(201).json({
				data:result.ops[0]
			});
``
	} catch(e) {
		return res.status(400).json({
			message: 'Something went wrong',
			error: e
		});
	}
};

const updateUser = async (req, res, next) => {

	try {
		const userId = req.params.id;
		const body = req.body;
		const newUser = {$set: req.body};
        const user = await req.db.collection('users').findOne({
            _id: ObjectId(userId)
        });
		
        if (!user) {
            return next(new Error('USER_NOT_FOUND'));
        }

        req.db.collection('users').updateOne({
			_id: ObjectId(userId)
		}, newUser)
			return res.status(200).json({
				message : 'update user succesful',
				data: newUser
			});
		
	} catch (e) {
		console.log(e);
		return next(e);
	}
};

const getUser = async (req, res, next) => { // API get list users
	try {
        const users = await req.db.collection('users').find().toArray();
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
        const user = await req.db.collection('users').findOne({
            _id: ObjectId(userId)
        });

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
	deleteUser: deleteUser,
	createUser: createUser,
	updateUser: updateUser,
	getOneUser: getOneUser,
	getUser: getUser
}
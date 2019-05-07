const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const fs = require('fs');
const path = require('path');
const userController = require('./controlers/user');
const userMiddleawe = require('./middlewares/user-middleware')
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: false }))


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'hello-server';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
	//assert.equal(null, err);
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log("Connected successfully to server");

	const db = client.db(dbName);

	app.use(function(req, res, next) {
		req.db = db;
		next();
	});
  	app.get('/api/v1/users', userController.getUser)
	app.post('/api/v1/users', userMiddleawe.createUser , userController.createUser)
	app.delete('/api/v1/users/:id', userMiddleawe.deleteUser, userController.deleteUser)
	app.put('/api/v1/users/:id', userMiddleawe.updateUser, userController.updateUser)
	app.get('/api/v1/users/:id', userMiddleawe.getOneUser, userController.getOneUser)
	app.use((e, req, res, next) => {
	return res.status(400).json({
		//isSuccess: false,
		message: e.message || 'Have error',
	});
});

});

app.listen(port, function () {
	console.log(`Example app listening on port ${port}!`);
});

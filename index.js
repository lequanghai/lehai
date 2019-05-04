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
app.get('/api/v1/users', userController.GetUser)
app.post('/api/v1/users', userMiddleawe.createUser , userController.CreateUser)
app.delete('/api/v1/users/:id', userMiddleawe.deleteUser, userController.deleteUser)
app.put('/api/v1/users/:id', userMiddleawe.updateUser, userController.UpdateUser)
app.get('/api/v1/users/:id', userMiddleawe.getUser, userController.GetOneUser)



app.use((e, req, res, next) => {
	return res.status(400).json({
		isSuccess: false,
		message: e.message || 'Have error',
	});
});


app.listen(port, function () {
	console.log(`Example app listening on port ${port}!`);
});

const jwt  = require('jsonwebtoken')
exports.Authentication  = (req, res, next) => {
        const token = req.query.token || req.body.token;
		if (!token) {
			return next(new Error('Not found token'));
		}
        jwt.verify(token, 'shhhhh');
        return next();
   }


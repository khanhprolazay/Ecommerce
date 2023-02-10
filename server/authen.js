const jwt = require('jsonwebtoken');


module.exports = {
	authenToken: function (req, res, next) {
		const authorizationHeader = req.headers['authorization'];
		const token = authorizationHeader.split(' ')[1];
		if (!token) res.sendStatus(401); // Unauthorize

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) { 
				res.status(403).send(err); // Forbidden
				return;
			}; 
            next();
		});
	},
};

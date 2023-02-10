const jwt = require('jsonwebtoken');
const checkFieldObject = require('../utils/checkFieldObject');
const UserModel = require('../models/UserModel');

const defaultLocation = {
	country: ' Vietnam',
	province: ' Tien Giang',
	district: ' Cai Lậy District',
	ward: ' Thạnh Lộc',
	address: 'G259+X75',
	location: {
		lat: 10.509862,
		lng: 106.0182,
	},
};

class UserController {
	#dbName;

	constructor() {
		this.#dbName = 'user';
	}

	//[POST] /login
	// Check login. If username and password receive from client is correct
	// -> Send user information to client
	login = async (req, res, next) => {
		if (
			!checkFieldObject(req.body, 'username') ||
			!checkFieldObject(req.body, 'password')
		) {
			res.status(400).send('');
			return;
		}

		const username = req.body.username;
		const password = req.body.password;

		//Authentication
		UserModel.findByUsernameAndPassword(username, password)
			.then((data) => {
				if (!data) {
					res.status(400).send('Tên đăng nhập hoặc mật khẩu không đúng !');
					return;
				}

				const user = data;
				const accessToken = jwt.sign(
					{ username: user.username },
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: '30s' }
				);

				const refreshToken = jwt.sign(
					{ username: user.username },
					process.env.REFRESH_TOKEN_SECRET,
					{ expiresIn: '604800s' }
				); // 7 days

				// Update refreshToken of that user
				user.refreshToken.push(refreshToken);

				//Store reresh token to database and send data to client
				UserModel.updateUser(username, {
					refreshToken: user.refreshToken,
				}).then(() => res.json({ accessToken, refreshToken, user }));
			})
			.catch((err) => res.send(err));
	};

	//POST /logout
	// Delete refresh token in database
	logout = (req, res, next) => {
		if (!checkFieldObject(req.body, 'username')) {
			res.sendStatus(403);
			return;
		}
		const username = req.body.username;
		UserModel.deleteRefreshTokenByUsername(username)
			.then(() => res.sendStatus(200))
			.catch((err) => res.send(err));
	};

	//[POST] /refreshToken
	refreshToken = (req, res, next) => {
		if (!checkFieldObject(req.body, 'token')) {
			res.sendStatus(401);
			return;
		}

		const refreshToken = req.body.token;
		const username = jwt.decode(refreshToken).username;

		// Get refresh token array of user
		UserModel.getRefreshTokenByUsername(username).then((refreshTokenArray) => {
			if (!refreshTokenArray.includes(refreshToken)) {
				res.status(403).send(''); //Forbidden
				return;
			}

			//Create a new accessToken and send to user
			jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
				(err, data) => {
					if (err) {
						res.sendStatus(403); // Forbidden
						return;
					}
					const accessToken = jwt.sign(
						{ username: username },
						process.env.ACCESS_TOKEN_SECRET,
						{ expiresIn: '1200s' }
					);
					res.json({ accessToken });
				}
			);
		});
	};

	// [POST] /signup
	// Signup function
	createUser = async (req, res, next) => {
		if (
			!checkFieldObject(req.body, 'username') ||
			!checkFieldObject(req.body, 'password') ||
			!checkFieldObject(req.body, 'repassword')
		) {
			res.status(400).send('');
			return;
		}

		const username = req.body.username;
		const password = req.body.password;
		const repassword = req.body.repassword;

		if (password !== repassword) {
			res.status(400).send('Mật khẩu nhập lại không đúng');
			return;
		}

		// Check if username is existed
		const isUsernameExisted = await UserModel.isUsernameExisted(username);
		if (isUsernameExisted) {
			res.status(400).send('Tên đăng nhập đã tồn tại!');
			return;
		}

		UserModel.insertNewUser({
			username: username,
			password: password,
			fullname: username,
			image:
				'https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg',
			number: '',
			refreshToken: [],
			items: [],
			location: defaultLocation,
		})
			.then(() => res.sendStatus(200))
			.catch((err) => res.send(err));
	};

	updateLocation = async (req, res, next) => {
		if (
			!checkFieldObject(req.body, 'location') ||
			!checkFieldObject(req.body, 'username')
		) {
			res.status(400).send();
			return;
		}

		const username = req.body.username;
		const location = req.body.location;
		UserModel.updateUser(username, { location: location })
			.then(() => res.sendStatus(200))
			.catch((err) => res.send(err));
	};
}

module.exports = new UserController();

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const couchDB = require('../resource/dbConfig');
const checkFieldObject = require('../utils/checkFieldObject');


class UserController {
	#dbName;

	constructor() {
		this.#dbName = 'user';
	}

	//[POST] /login
	// Check login. If username and password receive from client is correct
	// -> Send user information to client
	login = (req, res, next) => {
		if (
			!checkFieldObject(req.body, 'username') ||
			!checkFieldObject(req.body, 'password')
		) {
			res.status(400).send('');
			return;
		}

		const username = req.body.username;
		const password = req.body.password;
		const mangoQuery = { selector: {username: username, password: password} };

		
		//Authentication
		couchDB
			.mango(this.#dbName, mangoQuery)
			.then((data, headers, status) => {
				const user = data.data.docs[0];
				const userInfor = (({_id, username, fullname, image, number, items}) => ({_id, username, fullname, image, number, items}))(user);

				//Authorization
				const accessToken = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1200s'});
				const refreshToken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '604800s'}); // 7 days

				user.refreshToken.push(refreshToken);

				//Store reresh token to database and send data to client
				couchDB
					.update(this.#dbName, {...user, refreshToken: user.refreshToken})
					.then(() => res.json({accessToken, refreshToken, userInfor}))
			})
			.catch((err) => next(err));

	}

	//POST /logout
	// Delete refresh token in database
	logout = (req, res, next) => {
		if (!checkFieldObject(req.body, 'username')) {
			res.sendStatus(403);
			return;
		}

		const username = req.body.username;
		const mangoQuery = { selector: {username: username} };
		couchDB
			.mango(this.#dbName, mangoQuery)
			.then((data, headers, status) => {
				const user = data.data.docs[0];
				couchDB
					.update(this.#dbName, {...user, refreshToken: []})
					.then(() => res.sendStatus(200));
			})
	}

	//[POST] /refreshToken
	refreshToken = (req, res, next) => {
		if (!checkFieldObject(req.body, 'token') || !checkFieldObject(req.body, 'username')) {
			res.sendStatus(401);
			return;
		}

		const refreshToken = req.body.token;
		const username = req.body.username;

		// Get refresh token array of user
		const mangoQuery = {selector: {username: username}};
		couchDB
			.mango(this.#dbName, mangoQuery)
			.then((data, headers, status) => {
				const user = data.data.docs[0];

				console.log(user.refreshToken);
				console.log(refreshToken);

				// Check if refresh token is in the array.
				// If not, send error status to client
				if (!user.refreshToken.includes(refreshToken)) {
					res.sendStatus(403); //Forbidden
					return;
				}

				//Creata new accress token and send to client
				jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
					if (err) { 
						res.sendStatus(403);
						return;
					}
					const accessToken = jwt.sign({ username: data.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1200s' });
					res.json({accessToken});
				})	
			}) 
	}

	// [POST] /signup
	// Signup function
	createUser = (req, res, next) => {
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
		const mangoQuery = {
			selector: { username: username },
		};
		couchDB
			.mango('user', mangoQuery)
			.then((data) => {
				// If true, send to client following notify
				if (data.data.docs.length !== 0) {
					res.status(400).send('Tên đăng nhập đã tồn tại');
					return;
				}

				// If not, insert new document to database
				// Insert document to user
				couchDB
					.insert('user', {
						_id: uuidv4(),
						username: username,
						password: password,
						fullname: username,
						image: 'https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg',
						number: '',
						refreshToken: [],
						items: []
					})
			})
			.catch((err) => {
				res.status(400).send(err);
				return;
			});
	}
}

module.exports = new UserController();

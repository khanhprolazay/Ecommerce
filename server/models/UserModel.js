const { v4: uuidv4 } = require('uuid');
const couchDB = require('../resource/dbConfig');

class UserModel {
	#dbName;
	constructor() {
		this.#dbName = 'user';
	}

	// Return an array of user. If it doesn't match any user,
	// return an undefined
	async findByUsernameAndPassword(username, password) {
		const query = {
			selector: { username: username, password: password },
			fields: ['_id', '_rev', 'username', 'fullname', 'image', 'number', 'items', 'refreshToken'],
		};
		const data = await couchDB.mango(this.#dbName, query);
		return data.data.docs[0];
	}

	async getRefreshTokenByUsername(username) {
		const query = {
			selector: {username: username},
			fields: ['refreshToken'],
		}
		const data = await couchDB.mango(this.#dbName, query);
		return data.data.docs[0].refreshToken;
	}

	async isUsernameExisted(username) {
		const query = { selector: { username: username } };
		const data = await couchDB.mango(this.#dbName, query);
		return data.data.docs[0] ? true : false;
	}

	async insertNewUser(user) {
		couchDB.insert(this.#dbName, { ...user, _id: uuidv4() });
	}

	async updateUser(username, updatedField) {
		const query = { selector: { username: username} };
		const data = await couchDB.mango(this.#dbName, query);
		const user = data.data.docs[0];
		await couchDB.update(this.#dbName, {...user, ...updatedField});
	}

	async deleteRefreshTokenByUsername(username) {
		this.updateUser(username, {refreshToken: []});
	}

	async getFieldsByUsername(username, fields) {
		if (fields.includes('password')) return;
        const query = {
            selector: {username: username},
            fields: fields,
        }
        const data = await couchDB.mango(this.#dbName, query);
        return data.data.docs[0][fields];
    }
}


module.exports = new UserModel();

const NodeCouchDb = require('node-couchdb');

const couchDB = new NodeCouchDb({
	auth: {
		user: process.env.DATABASE_ACCOUNT_USERNAME,
		pass: process.env.DATABASE_ACCOUNT_PASSWORD,
	},
});

module.exports = couchDB;

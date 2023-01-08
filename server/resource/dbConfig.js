const NodeCouchDb = require('node-couchdb');

const couchDB = new NodeCouchDb({
    auth: {
        user: 'root',
        pass: 'root'
    }
});

module.exports = couchDB;
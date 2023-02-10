const couchDB = require('../resource/dbConfig');

class ShopModel {
    #dbname;
    constructor() {
        this.#dbname = 'shop-infor';
    }
    async getLocation() {
        const query = { selector: {_id: "c66b5002f8e7916057e13f2b5b0221d7"}};
        const data = await couchDB.mango(this.#dbname, query);
        return data.data.docs[0].location;
    }   
}

module.exports = new ShopModel();
const { v4: uuidv4 } = require('uuid');
const couchDB = require('../resource/dbConfig');

class ProductModel {
    #dbName;
    constructor() {
        this.#dbName = 'clothes-shop';
    }

    async getProducts(_sortBy, _limit, _skip) {
        let sortField = '';

		switch (_sortBy) {
			case 'hot':
				sortField = 'sellQuantity';
				break;
			case 'new':
				sortField = 'updatedAt';
				break;
			case 'sale':
				sortField = 'discount';
				break;
			default :
				return;
		}

		const queryOptions = {
			descending: true,
			include_docs: true,
			limit: _limit,
			skip: _skip
		};

		const viewUrl = `_design/sort/_view/sort-by-${sortField}`;
		const data = await couchDB.get(this.#dbName, viewUrl, queryOptions)
		return data;
    }

    async findProductById(id) {
        const query = { selector: { _id: id } };
        const data = await couchDB.mango(this.#dbName, query);
        return data.data.docs[0];
    }

    async insertProduct(item) {
        await couchDB.insert(this.#dbName, {...item, _id: uuidv4()});
    }

    async updateProduct(id, updatedField) {
        const item = await this.findProductById(id);
        await couchDB.update(this.#dbName, {...item, ...updatedField});
    }

    async updateQuantityWhenOrder(id, quantity) {
        const item = await this.findProductById(id);
        if (quantity > item.stockQuantity) return;
        await this.updateProduct(id, {
            stockQuantity: item.stockQuantity - quantity,
		    sellQuantity: item.sellQuantity + quantity,
        })
    }

    async getFieldById(id, fields) {
        const query = { selector: { _id: id }, fields: fields };
        let data =  await couchDB.mango(this.#dbName, query);
        return data.data.docs[0][fields];
    }

    async getStockQuantityById(id) {
        return this.getFieldById(id, ['stockQuantity']);
    }

}

module.exports = new ProductModel();
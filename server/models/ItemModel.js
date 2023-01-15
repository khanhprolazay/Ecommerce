const { v4: uuidv4 } = require('uuid');
const couchDB = require('../resource/dbConfig');

class ItemModel {
    #dbName;
    constructor() {
        this.#dbName = 'clothes-shop';
    }

    async getItems(sortBy, limit, skip) {
        let sortField = '';

		switch (sortBy) {
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
			limit: limit,
			skip: skip
		};
		const viewUrl = `_design/sort/_view/sort-by-${sortField}`;
		const data = await couchDB.get(this.#dbName, viewUrl, queryOptions)
		return data;
    }

    async findItemById(id) {
        const query = { selector: { _id: id } };
        const data = await couchDB.mango(this.#dbName, query);
        return data.data.docs[0];
    }

    async insertItem(item) {
        await couchDB.insert(this.#dbName, {...item, _id: uuidv4()});
    }

    async updateItem(id, updatedField) {
        const item = await this.findItemById(id);
        await couchDB.update(this.#dbName, {...item, ...updatedField});
    }

    async updateQuantityWhenOrder(id, quantity) {
        const item = await this.findItemById(id);
        if (quantity > item.stockQuantity) return;
        await this.updateItem(id, {
            stockQuantity: item.stockQuantity - quantity,
		    sellQuantity: item.sellQuantity + quantity,
        })
    }

    async getFieldItemById(id, fields) {
        const query = { selector: { _id: id }, fields: fields };
        let data =  await couchDB.mango(this.#dbName, query);
        return data.data.docs[0][fields];
    }

    async getStockQuantityById(id) {
        return this.getFieldItemById(id, ['stockQuantity']);
    }

}

module.exports = new ItemModel();
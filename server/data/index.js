const axios = require('axios');
const json = require('./recommend.json');
const items = json.data.sections[0].data.item;

const randomInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const daysOfMonth = (month, year) => {
	return new Date(year, month, 0).getDate();
};

const randomDate = () => {
	const month = randomInteger(6, 12);
	const year = 2022;
	const day = randomInteger(1, daysOfMonth(month, year));
	return `${month}/${day}/${year}`;
};

const storeItemToDb = (item) => {
	const date = randomDate();

	item.createdAt = date;
	item.updatedAt = date;
	item.sellQuantity = randomInteger(100, 500);
	item.category = 'Áo khoác nam';

	// axios.put('http://localhost:5000/items', {
	//     item: JSON.stringify(item)
	// }).then((data) => {})
	// .catch((err) => console.log(err))
	console;
};


for (const index in items) {
	let item = {};
	const date = randomDate();
	const rating = items[index].item_rating.rating_star;

	item._id = items[index].itemid;
	item.productName = items[index].name;
	item.image = `https://cf.shopee.vn/file/${items[index].image}`;
	item.price = items[index].price_max / 100000;
	item.discount = randomInteger(1, 30) / 100;
	item.rating = Math.round(rating * 10) / 10;
	item.stockQuantity = items[index].stock;
	item.createdAt = date;
	item.updatedAt = date;
	item.sellQuantity = randomInteger(100, 500);
	item.category = 'Thắt Lưng';

	axios
		.put('http://localhost:5000/items', {
			item: JSON.stringify(item),
		})
		.then((data) => {})
		.catch((err) => {});

}


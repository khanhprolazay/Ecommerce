const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

// router
const items = require('./router/items.js');
const carts = require('./router/carts.js');

// PORT
const app = express();
const PORT = process.env.port || 5000;

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());
app.use(morgan('combined'));

// Address
app.use('/items', items);
app.use('/carts', carts);

try {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
} catch {(err) => {
    console.log('err', err);
}}
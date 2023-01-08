const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

//router
const users = require('./router/users.js')

// PORT
const app = express();
const PORT =  5500;

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());
app.use(morgan('combined'));

// Address
app.use('/', users);

try {
    app.listen(PORT, () => {
        console.log(`Authentication server is running on ${PORT}`);
    })
} catch {(err) => {
    console.log('err', err);
}}
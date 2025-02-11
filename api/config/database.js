const mongoose = require('mongoose');
require('dotenv').config();

const { DB_URI } = process.env;

const connection = mongoose.connect(DB_URI);

module.exports = connection;

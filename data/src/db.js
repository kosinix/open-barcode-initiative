//// Core modules
const util = require('util');

//// External modules
const mongoose = require('mongoose');

//// Code
let opts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true ,
    promiseLibrary: Promise // Use ES6 Promise
}

let connection1 = `mongodb://${CRED.mongodb.users.web.username}:${CRED.mongodb.users.web.password}@${CONFIG.mongodb.connections.web.host}/${CONFIG.mongodb.connections.web.dbName}`;
let web = mongoose.createConnection(connection1, opts);

web.on('connected', () => {
    console.log('Database connected to', `${CONFIG.mongodb.connections.web.host}/${CONFIG.mongodb.connections.web.dbName}`);
});
web.catch((err) => {
    console.log('Connection error:', err.message);
});
web.on('disconnected', () => {
    console.log('Database disconnected from', `${CONFIG.mongodb.connections.web.host}/${CONFIG.mongodb.connections.web.dbName}`);
});

web.Product = web.model('Product', require('./models/product'));

module.exports = {
    mongoose: mongoose,
    web: web,
}
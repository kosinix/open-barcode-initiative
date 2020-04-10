//// Core modules

//// External modules

//// Modules
require('./init');

//// Create our app
let server = require('./data/src/express');
server.listen(CONFIG.app.port, function () {
    console.log(`App running in "${ENV}" mode at "${CONFIG.app.url}"`);
});
server.keepAliveTimeout = 60000 * 2;



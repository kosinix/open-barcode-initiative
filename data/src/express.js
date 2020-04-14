//// Core modules

//// External modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const lodash = require('lodash');

//// Modules
const nunjucksEnv = require('../src/nunjucks-env');
const routes = require('../src/routes');
const session = require('../src/session');

//// Create app
const app = express();

//// Setup view
nunjucksEnv.express(app);

//// Global variables
// App

// Remove express
app.set('x-powered-by', false);

//// Middlewares
// Powered by
app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'farmcal'); // Defaults to all files
    next();
});

// Session middleware
app.use(session);

// Static public files
let setHeaders = (res, path, stat) => {
    res.setHeader('X-Powered-By', 'farmcal static'); // Add this to static files
}
app.use(express.static(CONFIG.app.dirs.public, { setHeaders: setHeaders }));

// Body class
app.use((req, res, next) => {
    // CONFIG.app.url = 'http://'+req.get('host') // TODO: remove for mobile tether testing
    // If path "/about-us" becomes "page-about-us"
    let bodyClass = 'page' + (req.baseUrl + req.path).replace(/\//g, '-');
    bodyClass = lodash.trim(bodyClass, '-');
    bodyClass = lodash.trimEnd(bodyClass, '.html');
    req.app.locals.bodyClass = bodyClass; // global body class css

    next();
});


// Parse http body
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Cookies
app.use(cookieParser());


// Gzip response
app.use(compression());

//// Set express vars
// Indicates the app is behind a front-facing proxy, and to use the X-Forwarded-* headers to determine the connection and the IP address of the client.
app.set('trust proxy', CONFIG.express.trustProxy);

// Hide nave
app.use((req, res, next) => {
    let hideNav = lodash.get(req, 'cookies.hideNav', 'true')
    res.locals.hideNav = hideNav
    next();
});

//// Routes
app.use(routes);

// Error handler
app.use(function (error, req, res, next) {
    try {
        if (res.headersSent) {
            return next(error);
        }
        req.socket.on("error", function (err) {
            console.error(err);
        });
        res.socket.on("error", function (err) {
            console.error(err);
        });


        console.error(req.originalUrl)
        console.error(error)
        if (req.xhr) { // response when req was ajax
            return res.status(400).send(error.message)
        }
        if (/^\/api\//.test(req.originalUrl)) {
            return res.status(500).send('API error...');
        }

        // Anything that is not catched
        res.status(500).render('error.html', { error: error.message });
    } catch (err) {
        console.error(req.originalUrl)
        console.error(error)
        res.status(500).send('Unexpected error!');
    }
});

//// Export
module.exports = app;
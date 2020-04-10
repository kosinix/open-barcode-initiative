//// Core modules

//// External modules
const express = require('express');
const moment = require('moment');

//// Modules


let router = express.Router();

router.use(require('../src/routes/public'));


// 404 Page
router.use((req, res) => {
    res.status(404).render('error.html', { error: "Page not found." });
});


module.exports = router;
//// Core modules

//// External modules
const express = require('express');

//// Modules


let router = express.Router();

router.use(require('../src/routes/public'));
router.use(require('../src/routes/protected'));


// 404 Page
router.use((req, res) => {
    if(req.xhr){
        return res.status(404).send(`Resource "${req.method} ${req.originalUrl}" not found.`);
    }
    res.status(404).render('error.html', { error: "Page not found." });
});


module.exports = router;
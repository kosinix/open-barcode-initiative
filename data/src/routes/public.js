//// Core modules

//// External modules
const express = require('express');
const fileUpload = require('express-fileupload');
const lodash = require('lodash');

//// Modules
const db = require('../db');
const middlewares = require('../middlewares');


let router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.render('scan.html', {
        })
    } catch (err) {
        next(err);
    }
});

router.post('/', fileUpload(), middlewares.handleExpressUploadMagic, async (req, res, next) => {
    try {
        
        let body = req.body
        let files = req.saveList

        let product = new db.web.Product({
            barcode: body.barcode,
            name: body.name,
            model: body.model,
        })
        if(lodash.has(files, 'photo.0')){
            product.photo = files.photo[0]
        }

        await product.save()
        
        return res.send(product)
        res.render('scan.html', {
        })
    } catch (err) {
        next(err);
    }
});

router.get('/products', async (req, res, next) => {
    try {
        let products = await db.web.Product.find({

        }).limit(10)
        res.render('products.html', {
            products: products
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router;

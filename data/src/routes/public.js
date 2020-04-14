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
        res.render('index.html', {
        })
    } catch (err) {
        next(err);
    }
});

router.get('/scan', async (req, res, next) => {
    try {
        res.render('scan.html', {
        })
    } catch (err) {
        next(err);
    }
});

router.post('/scan', async (req, res, next) => {
    try {
        
        let body = req.body

        let products = await db.web.Product.find({
            barcode: body.barcode,
        })
        console.log(products)
        if(products && products.length <= 0){
            return res.redirect(`/product/create?barcode=${body.barcode}`)
        }
        res.redirect(`/product/edit?barcode=${body.barcode}`)

    } catch (err) {
        next(err);
    }
});

router.get('/product/create', async (req, res, next) => {
    try {
        
        res.render('products/create.html')
    } catch (err) {
        next(err);
    }
});
router.post('/product/create', fileUpload(), middlewares.handleExpressUploadMagic, async (req, res, next) => {
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
        
        return res.redirect('/products')
    } catch (err) {
        next(err);
    }
});

router.get('/product/edit', async (req, res, next) => {
    try {
        let barcode = lodash.get(req.query, 'barcode')
        let product = await db.web.Product.findOne({
            barcode: barcode
        })
        if(product){
            product = product.toObject()
        }
        res.render('products/edit.html', {
            product: product
        })
    } catch (err) {
        next(err);
    }
});
router.post('/product/edit', fileUpload(), middlewares.handleExpressUploadMagic, async (req, res, next) => {
    try {
        
        let body = req.body
        let files = req.saveList

        
        let product = await db.web.Product.findOne({
            barcode: body.barcode,
        })
        if(product){
            product.name = body.name
            product.size = body.size
            product.unit = body.unit
            product.description = body.description
            if(lodash.has(files, 'photo.0')){
                product.photo = files.photo[0]
            }
            await product.save()
        }

        return res.send({
            body: body,
            files: files,
        })
        return res.redirect('/products')
    } catch (err) {
        next(err);
    }
});

router.get('/products', async (req, res, next) => {
    try {
        let products = await db.web.Product.find({
    
        })
        res.render('products/all.html', {
            products: products
        })
    } catch (err) {
        next(err);
    }
});





module.exports = router;

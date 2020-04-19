//// Core modules

//// External modules
const express = require('express');
const fileUpload = require('express-fileupload');
const lodash = require('lodash');

//// Modules
const db = require('../db');
const middlewares = require('../middlewares');
const s3 = require('../awsS3')


let router = express.Router();

router.use(middlewares.requireAuth)
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
            size: body.size,
            unit: body.unit,
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

        // return res.send({
        //     body: body,
        //     files: files,
        // })
        return res.redirect('/products')
    } catch (err) {
        next(err);
    }
});

router.post('/product/:barcode/photos', fileUpload(), middlewares.handleExpressUploadMagic, async (req, res, next) => {
    try {
        let files = req.saveList

        
        let product = await db.web.Product.findOne({
            barcode: req.params.barcode,
        })
        if(product){
            lodash.each(files, (field, name) =>{
                lodash.each(field, (file) =>{
                    product.photos.push(file)
                })
            })
            await product.save()
        }

        return res.send({
            saveList: files,
        })
    } catch (err) {
        next(err);
    }
});

router.delete('/product/:productId/photo/:src', async (req, res, next) => {
    try {
        const bucketName = CONFIG.aws.bucket1.name
        const bucketKeyPrefix = CONFIG.aws.bucket1.prefix 
        const bucketKey = req.params.src
        
        let product = await db.web.Product.findById(req.params.productId)
        if(!product){
            throw new Error('Product not found.')
        } else {
            await s3.deleteObjects({
                Bucket: bucketName,
                Delete: {
                    Objects: [
                        {Key: `${bucketKeyPrefix}${bucketKey}`},
                        {Key: `${bucketKeyPrefix}tiny-${bucketKey}`},
                        {Key: `${bucketKeyPrefix}small-${bucketKey}`},
                        {Key: `${bucketKeyPrefix}medium-${bucketKey}`},
                        {Key: `${bucketKeyPrefix}large-${bucketKey}`},
                    ]
                }
            }).promise()
            product.photos = lodash.filter(product.photos, function(o) {
                return bucketKey !== o;
            });
            await product.save()
        }

        return res.send(product.photos)
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

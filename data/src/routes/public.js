//// Core modules

//// External modules
const express = require('express');
const fileUpload = require('express-fileupload');
const lodash = require('lodash');

//// Modules
const db = require('../db');
const middlewares = require('../middlewares');
const flash = require('../flash')


let router = express.Router();

router.get('/', async (req, res, next) => {
    try {

        let recent = await db.web.Product.find({},{}, {limit: 9}).sort({
            createdAt: -1
        })

        res.render('index.html', {
            recent: recent,
        })
    } catch (err) {
        next(err);
    }
});

router.get('/login', async (req, res, next) => {
    try {
        let user = lodash.get(req, 'session.user')
        if(user){
            return res.redirect('/products')
        }
        // let salt = 'QJJjfkW3GDY8Vrvm7bHtwYawsA74Y6X3'
        // let passwordHash = db.web.User.hashPassword('NicO2020?', salt)

        // let user = new db.web.User({
        //     username: 'kosinix',
        //     passwordHash: passwordHash,
        //     passwordSalt: salt
        // })
        // await user.save()
        res.render('login.html', {
            flash: flash.get(req, 'login')
        })
    } catch (err) {
        next(err);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        let user = await db.web.User.findOne({
            username: req.body.username,
        })

        if (!user) {
            console.log('User not found.')
            flash.error(req, 'login', 'User not found.')
            return res.redirect('/login')
        }

        let passwordHash = db.web.User.hashPassword(req.body.password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            console.log('Password incorrect.')
            flash.error(req, 'login', 'Password incorrect.')
            return res.redirect('/login')
        }

        lodash.set(req, 'session.user', user.toObject())
        // let loginRedirect = lodash.get(req, 'session.auth.loginRedirect', '/products')
        res.redirect('/products')
    } catch (err) {
        next(err);
    }
});
router.get('/logout', async (req, res, next) => {
    try {
        lodash.set(req, 'session.user', null);
        res.clearCookie(CONFIG.session.name, CONFIG.session.cookie);
        res.redirect('/')
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
router.get('/input', async (req, res, next) => {
    try {
        res.render('input.html', {
        })
    } catch (err) {
        next(err);
    }
});
router.post('/scan', async (req, res, next) => {
    try {
        let body = req.body
        let user = lodash.get(req, 'session.user')

        if(user){
            let barcode = lodash.get(body, 'barcode')

            let products = await db.web.Product.find({
                barcode: barcode,
            })
            if(products.length <= 0){
                return res.redirect(`/product/create?barcode=${body.barcode}`)

            }
        }
        return res.redirect(`/results?barcode=${body.barcode}`)
    } catch (err) {
        next(err);
    }
});

router.get('/results', async (req, res, next) => {
    try {
        let barcode = lodash.get(req, 'query.barcode')

        let products = await db.web.Product.find({
            barcode: barcode,
        })

        let allProducts = await db.web.Product.find({
            barcode: {
                $ne: barcode,
            }
        }).limit(10)

        let productsCount = await db.web.Product.countDocuments()

        res.render('results/all.html', {
            products: products,
            allProducts: allProducts,
            productsCount: productsCount,
        })
    } catch (err) {
        next(err);
    }
});

router.get('/result/:productId', middlewares.getProduct, async (req, res, next) => {
    try {
        let product = res.product
        
        res.render('results/read.html', {
            product: product
        })
    } catch (err) {
        next(err);
    }
});    


router.get('/photo/:bucketKey', async (req, res, next) => {
    try {
        let bucketKey = req.params.bucketKey
        let size = lodash.get(req, 'query.size','')
        let prefix = ''
        if(size) {
            prefix = `${size}-` // append "-" eg. large-
        }

        res.render('photo.html', {
            bucketKey: bucketKey,
            size: size,
            alt: 'Photo - ' + size,
            url: `https://kosinix-bucket1.s3-ap-southeast-1.amazonaws.com/${prefix}${bucketKey}`
        })
    } catch (err) {
        next(err);
    }
});   

router.get('/result/:productId/photo/:bucketKey', middlewares.getProduct, async (req, res, next) => {
    try {
        let product = res.product

        let bucketKey = req.params.bucketKey
        let size = lodash.get(req, 'query.size','')
        let prefix = ''
        if(size) {
            prefix = `${size}-` // append "-" eg. large-
        }

        res.render('results/read-photo.html', {
            product: product,
            bucketKey: bucketKey,
            size: size,
            alt: 'Photo - ' + size,
            url: `https://kosinix-bucket1.s3-ap-southeast-1.amazonaws.com/${prefix}${bucketKey}`
        })
    } catch (err) {
        next(err);
    }
});   






module.exports = router;

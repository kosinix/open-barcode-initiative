//// Core modules

//// External modules
const lodash = require('lodash');

//// Modules
const uploader = require('./uploader');

let handleExpressUploadMagic = async (req, res, next) => {
    try {
        let uploadDir = CONFIG.app.dirs.upload

        let files = lodash.get(req, 'files', [])
        let localFiles = await uploader.handleExpressUploadLocalAsync(files, uploadDir)
        let imageVariants = await uploader.resizeImagesAsync(localFiles, null, uploadDir); // Resize uploaded images

        let uploadList = uploader.generateUploadList(imageVariants, localFiles)
        let saveList = uploader.generateSaveList(imageVariants, localFiles)
        await uploader.uploadToS3Async(uploadList)
        await uploader.deleteUploadsAsync(localFiles, imageVariants)
        req.localFiles = localFiles
        req.imageVariants = imageVariants
        req.saveList = saveList
        next()
    } catch (err) {
        next(err)
    }
}

let requireAuth = async (req, res, next) => {
    try {
        let user = lodash.get(req, 'session.user')
        if (!user) {
            if (CONFIG.userSession.allowedUrls.includes(req.originalUrl)) {
                lodash.set(req, 'session.auth.loginRedirect', req.originalUrl)
            }

            return res.redirect('/login')
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    handleExpressUploadMagic: handleExpressUploadMagic,
    requireAuth: requireAuth,
}
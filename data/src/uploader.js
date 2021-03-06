//// Core modules
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

//// External modules
const lodash = require('lodash');
const fileGuesser = require('guess-file-type');
const sharp = require('sharp');

//// Modules
const s3 = require('./awsS3')

const localPrefix = '__incomplete-' // Uploaded file prefix
const _imageSizes = [
    // {
    //     name: 'tiny',
    //     allowedMimes: ["image/jpeg", "image/png"], // Resize only if source file is this mime type
    //     mimeType: 'image/jpeg', // Destination file type
    //     fxFileName: (baseName) => { // Basename without extension (.jpeg)
    //         return `tiny-${baseName}.jpeg`
    //     },
    //     fx: async (srcFile, destFile) => {
    //         sharp.cache(false); // Disable unlink error due files not released
    //         // returns Promise
    //         return sharp(srcFile)
    //             .rotate() // Auto rotate based on device orientation
    //             .resize(30, 30)
    //             .max()
    //             .background({ r: 255, g: 255, b: 255, alpha: 1 })
    //             .flatten()
    //             .jpeg()
    //             .toFile(destFile);

    //     }
    // },
    {
        name: 'small',
        allowedMimes: ["image/jpeg", "image/png"], // Resize only if source file is this mime type
        mimeType: 'image/jpeg', // Destination file type
        fxFileName: (baseName) => { // Basename without extension (.jpeg)
            return `small-${baseName}.jpeg`
        },
        fx: async (srcFile, destFile) => {
            sharp.cache(false); // Disable unlink error due files not released
            // returns Promise
            return sharp(srcFile)
                .rotate()
                .resize(120, 120)
                .max()
                .background({ r: 255, g: 255, b: 255, alpha: 1 })
                .flatten()
                .jpeg()
                .toFile(destFile);

        }
    },
    {
        name: 'medium',
        allowedMimes: ["image/jpeg", "image/png"], // Resize only if source file is this mime type
        mimeType: 'image/jpeg', // Destination file type
        fxFileName: (baseName) => { // Basename without extension (.jpeg)
            return `medium-${baseName}.jpeg`
        },
        fx: async (srcFile, destFile) => {
            sharp.cache(false); // Disable unlink error due files not released
            // returns Promise
            return sharp(srcFile)
                .rotate()
                .resize(350, 350)
                .max()
                .background({ r: 255, g: 255, b: 255, alpha: 1 })
                .flatten()
                .jpeg()
                .toFile(destFile);

        }
    },
    {
        name: 'large',
        allowedMimes: ["image/jpeg", "image/png"], // Resize only if source file is this mime type
        mimeType: 'image/jpeg', // Destination file type
        fxFileName: (baseName) => { // Basename without extension (.jpeg)
            return `large-${baseName}.jpeg`
        },
        fx: async (srcFile, destFile) => {
            sharp.cache(false) // Disable unlink error due files not released
            // returns Promise
            return sharp(srcFile)
                .rotate()
                .resize(1000, 1000)
                .max()
                .background({ r: 255, g: 255, b: 255, alpha: 1 })
                .flatten()
                .jpeg()
                .toFile(destFile);

        }
    },
    {
        name: 'orig',
        allowedMimes: ["image/jpeg", "image/png"], // Resize only if source file is this mime type
        mimeType: 'image/jpeg', // Destination file type
        fxFileName: (baseName) => { // Basename without extension (.jpeg)
            return `${baseName}.jpeg`
        },
        fx: async (srcFile, destFile) => {
            let newWidth = 1500
            let newHeight = 1500
            sharp.cache(false) // Disable unlink error due files not released

            let image = await sharp(srcFile);
            // Resized image cannot be larger than the original image
            let metaData = await image.metadata()
            if (newWidth > metaData.width) {
                newWidth = metaData.width
            }
            if (newHeight > metaData.height) {
                newHeight = metaData.height
            }
            return image.withMetadata()
                .rotate()
                .resize(newWidth, newHeight)
                .max()
                .background({ r: 255, g: 255, b: 255, alpha: 1 })
                .flatten()
                .jpeg()
                .toFile(destFile);

        }
    }
]

/**
 * Move files into upload dir and rename it 
 * 
 * @param {Object} files An object containing files from express-upload req.files. 
 * Eg. format:
 * { 
 *   profilePicFiles: [
 *     { 
 *       name: 'gps.jpg',
 *       data: <Buffer ff d8 ... >,
 *       encoding: '7bit',
 *       truncated: false, 
 *       mimetype: 'image/jpeg',
 *       md5: '97fdc6ae077d8165f3cb4aa494ddb7d4',
 *       mv: [Function: mv]
 *     }
 *   ],
 *   ...
 * }
 * 
 * @param {String} uploadDir Absolute path to upload directory
 * @param {Array} allowedFields List of allowed form field names
 * @param {Array} allowedMimes List of allowed mime types for uploaded files
 * 
 * @returns {Promise} Containing array of files uploaded. 
 */
let handleExpressUploadLocalAsync = async (files, uploadDir, allowedMimes = ["image/jpeg", "image/png", "application/pdf"], fxFileName = null) => {
    if (!files) {
        return {};
    }

    // Normalize format. Convert content of files to arrays even if it only has one element
    lodash.each(files, (file, fieldName) => {
        if (!Array.isArray(file)) {
            files[fieldName] = [file];
        } else {
            files[fieldName] = file;
        }
    });

    if (!fxFileName) {
        /**
         * @param {Object} file A single object of express upload req.files
         */
        fxFileName = (file, prefix = '') => {
            // Eg. format: '__incomplete-6899f496c5fef1f35bb110e3997a2f07.jpeg'
            let ext = fileGuesser.getExtensionFromMime(file.mimetype)
            return `${prefix}${crypto.randomBytes(64).toString('hex')}.${ext}`
        }
    }

    let returnedFields = {}
    for (let fieldName in files) {
        let filesArray = files[fieldName];

        returnedFields[fieldName] = [];
        for (let index = 0; index < filesArray.length; index++) {

            let file = filesArray[index];

            let fileName = fxFileName(file, localPrefix)
            let destFile = path.join(uploadDir, fileName);

            await file.mv(destFile);

            let mimeType = await fileGuesser.guess(destFile);

            if (!allowedMimes.includes(mimeType)) {
                throw new Error("File type not allowed.");
            }


            returnedFields[fieldName].push({
                fieldName: fieldName,
                fileName: fileName,
                filePath: destFile,
                mimeType: mimeType,
            });
        };
    };
    return returnedFields;
}

/**
 * Resize uploaded image to different variants. Ignore non-image files.
 * 
 * @param {Object} uploadFields Object of uploaded files
    {
        "profilePicFiles": [
            {
                "fieldName": "profilePicFiles",
                "fileName": "fe584ad.jpeg",
                "filePath": "D:/nodejs/website/data/upload/fe584ad.jpeg",
                "mimeType": "image/jpeg",
            }
        ],
        ...
    }
 *
 * @param {Array} imageSizes The image sizes.
 * 
 * @returns {Promise} Promise containing array in the ff format
 * [
 *   {
 *     parentFile: '/asas/sasas.png',
 *     name: 'tiny',
 *     filePath: '/asas/tiny-sasas.jpeg',
 *     mimeType: 'image/jpeg',
 *   },
 *   ...
 * ]
 * 
 *
 * 
 */
let resizeImagesAsync = async (uploadFields, imageSizes, uploadDir) => {
    try {
        if (!imageSizes) {
            imageSizes = _imageSizes
        }

        let imageVariants = [];
        for (let fieldName in uploadFields) {
            let fileArray = uploadFields[fieldName];

            for (let fileArrayIndex = 0; fileArrayIndex < fileArray.length; fileArrayIndex++) {
                let file = fileArray[fileArrayIndex];

                let srcFile = file.filePath;

                let promises = [];
                for (let sizeIndex = 0; sizeIndex < imageSizes.length; sizeIndex++) {
                    let imageSize = imageSizes[sizeIndex];
                    if (imageSize.allowedMimes.includes(file.mimeType)) {

                        let sourceBaseName = path.basename(file.fileName, path.extname(file.fileName)) // Remove extension
                        sourceBaseName = sourceBaseName.replace(localPrefix, '') // Remove prefix
                        resizedFileName = imageSize.fxFileName(sourceBaseName) // Eg. tiny-asasasa.png
                        let resizedFile = path.join(uploadDir, resizedFileName)

                        promises.push(imageSize.fx(srcFile, resizedFile));

                        imageVariants.push({
                            parentFile: file.filePath,
                            name: imageSize.name,
                            filePath: resizedFile,
                            mimeType: imageSize.mimeType,
                        })
                    }
                }
                await Promise.all(promises);
            }
        }
        return imageVariants;
    } catch (err) {
        console.error('Image resize error');
        console.error(err);
        throw new Error('Image resize error');
    }
}

/**
 * Generate array of key and filePath pairs for upload
 * 
 * @param {Array} imageVariants Array of objects
 * Eg. format:
 * {
 *   parentFile: '/uploads/abc.png',
 *   name: 'xlarge',
 *   filePath: '/uploads/xlarge-abc.jpeg',
 *   mimeType: 'image/jpeg',
 * }
 * 
 * @param {Object} uploadFields 
 * Eg. format:
 * uploadFields: {
 *   fieldName: [
 *     {
 *       fieldName: '',
 *       fileName: '',
 *       filePath: '',
 *       mimeType: '',
 *     }
 *     ...
 *   ]
 * }
 */

let generateUploadList = (imageVariants, uploadFields) => {
    let forUploads = [];
    lodash.each(imageVariants, (variant) => {
        let fileName = path.basename(variant.filePath)

        // Upload all sizes, including xlarge
        forUploads.push({
            key: fileName,
            filePath: variant.filePath
        })

    });

    lodash.each(uploadFields, (files, fieldName) => {
        lodash.each(files, (file) => {
            if (file.mimeType === 'application/pdf') {
                forUploads.push({
                    key: file.fileName.replace(localPrefix, ''),
                    filePath: file.filePath
                })
            } else {

            }
        })
    })

    return forUploads
}

/**
 * Generate array of key and filePath pairs for upload
 * 
 * @param {Object} files An object of filePathsExp
 */
let generateSaveList = (imageVariants, uploadFields) => {
    let saveList = {};
    lodash.each(uploadFields, (files, fieldName) => {
        saveList[fieldName] = []
        lodash.each(files, (file) => {
            if (file.mimeType === 'application/pdf') {
                saveList[fieldName].push(file.fileName.replace(localPrefix, ''))
            } else {
                lodash.each(imageVariants, (variant) => {

                    if(variant.parentFile === file.filePath && variant.name==='orig'){
                        saveList[fieldName].push(path.basename(variant.filePath))
                    }
                });
            }
        })
    })

    return saveList
}

let uploadToS3Async = async (forUploads) => {
    try {
        const bucketName = CONFIG.aws.bucket1.name
        const bucketKeyPrefix = CONFIG.aws.bucket1.prefix 

        let promises = [];
        let results = [];
        for (let uploadIndex = 0; uploadIndex < forUploads.length; uploadIndex++) {
            let forUpload = forUploads[uploadIndex];
            promises.push(
                s3.upload({
                    Key: `${bucketKeyPrefix}${forUpload.key}`,
                    Bucket: bucketName,
                    ACL: "public-read",
                    Body: fs.createReadStream(forUpload.filePath)
                }).promise()
            );
        }
        results = await Promise.all(promises);

        return results;
    } catch (err) {
        console.error('Upload to s3 error');
        console.error(err);
        throw new Error('Upload to cloud error')
    }
}

let deleteUploadsAsync = async (uploadFields, imageVariants) => {
    let promises = [];

    lodash.each(uploadFields, async (filesArray) => {
        lodash.each(filesArray, async (file) => {
            // Delete image
            promises.push(unlinkAsync(file.filePath));
        })
    })
    lodash.each(imageVariants, async (file) => {
        // Delete sizes
        promises.push(unlinkAsync(file.filePath));
    })

    await Promise.all(promises);
}

//await ;
module.exports = {
    handleExpressUploadLocalAsync: handleExpressUploadLocalAsync,
    resizeImagesAsync: resizeImagesAsync,
    generateUploadList: generateUploadList,
    generateSaveList: generateSaveList,
    uploadToS3Async: uploadToS3Async,
    deleteUploadsAsync: deleteUploadsAsync
}


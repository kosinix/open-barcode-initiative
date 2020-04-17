let mongoose = require('mongoose');

let schema = mongoose.Schema({
    barcode: {
        type: String,
    },
    name: {
        type: String,
    },
    size: {
        type: Number,
    },
    unit: {
        type: String,
    },
    photo: {
        type: String,
    },
    photos: [
        {
            type: String,
        }
    ],
}, { timestamps: true });

//// Instance methods


//// Statics

module.exports = schema
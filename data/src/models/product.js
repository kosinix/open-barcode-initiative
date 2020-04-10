let mongoose = require('mongoose');

let schema = mongoose.Schema({
    barcode: {
        type: String,
    },
    name: {
        type: String,
    },
    model: {
        type: String,
    },
    photo: {
        type: String,
    }
}, { timestamps: true });

//// Instance methods


//// Statics

module.exports = schema
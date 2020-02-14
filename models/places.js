const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlacesSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 200
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
}, { versionKey: false });

module.exports = mongoose.model('Places', PlacesSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photo = new Schema({
    imgURL: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Photo = mongoose.model('Photo', photo);

module.exports = Photo;
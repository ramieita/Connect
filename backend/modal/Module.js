const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    modulename: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Module = mongoose.model('Module', moduleSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    text : {
        type :String,
        required :true
    },
    topic: [{
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        default: []
    }],
    date: {
        type: Date,
        default: Date.now()
    },
     

})

module.exports = User = mongoose.model('User', userSchema);
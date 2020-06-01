const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        require: true
    },
    user: {
        type: String,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Topic = mongoose.model('Topic', topicSchema);
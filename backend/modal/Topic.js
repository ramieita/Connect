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
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Topic = mongoose.model('Topic', topicSchema);
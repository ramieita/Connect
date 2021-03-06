const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true 
    },
    title: {
        type: String,
        required: true 
    },
    content: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Post = mongoose.model('Post', postSchema);
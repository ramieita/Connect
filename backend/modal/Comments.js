const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true 
    },
    commentContent: {
        type: String,
        required: true
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subcomments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Comment = mongoose.model('Comment', commentSchema);

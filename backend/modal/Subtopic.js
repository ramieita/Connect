const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subtopicSchema = new Schema({
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true 
    },
    title: {
        type: String,
        required: true 
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Topic = mongoose.model('Subtopic', subtopicSchema);
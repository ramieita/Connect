const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcommentSchema = new Schema({
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true 
    },
    replyContent: {
        type: String, 
        required: true   
    },
    replyedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Subcomment = mongoose.model('Subcomment', subcommentSchema);
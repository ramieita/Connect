const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageshema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  files: {
    type: Array
  },
  user : {
    type: String,
    ref: 'User',

  },
}, {
  collection: 'images'
})

module.exports = mongoose.model('Image', imageshema)
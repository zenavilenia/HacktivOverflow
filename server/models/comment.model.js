const mongoose = require('mongoose')
const Schema = mongoose.Schema

let commentSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  comment: String
},{
  timestamps: true
})

let comment = mongoose.model('comment', commentSchema)

module.exports = comment
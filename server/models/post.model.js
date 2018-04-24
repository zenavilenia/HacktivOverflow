const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: String,
  content: String,
  category: String,
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'answer'
  }]
},{
  timestamps: true
})

let post = mongoose.model('post', postSchema)

module.exports = post
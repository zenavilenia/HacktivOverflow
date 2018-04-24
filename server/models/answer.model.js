const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  answer: String,
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
},{
  timestamps: true
})

let answer = mongoose.model('answer', answerSchema)

module.exports = answer
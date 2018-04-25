const Post = require('../models/post.model')
const Answer = require('../models/answer.model')
const Comment = require('../models/comment.model')

module.exports = {
  findAll: (req, res) => {
    Post
    .find()
    .populate('user')
    .populate({
      path: 'answers',
      populate: [{
          path: 'comments',
          populate: {
            path: 'user'
          }
        }, {
          path: 'user'
        }]
    })
    .then(response => {
      res.status(200).send({
        message: 'Query all post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Query all post failed',
        err: err.message
      })
    })
  },
  findById: (req, res) => {
    const {id} = req.params
    Post.find({
      _id: id
    })
    .then(response => {
      res.status(200).send({
        message: 'Query one post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Query one post failed',
        err: err.message
      })
    })
  },
  add: (req, res) => {
    let user = req.headers.decoded.id
    console.log('ini decoded', req.headers.decoded)
    const {title, content, category} = req.body

    let newPost = Post ({
      user, title, content, category
    })

    newPost.save()
      .then(response => {
        res.status(201).send({
          message: 'Add new post success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Add new post failed',
          err: err.message
        })
      })
  },
  addAnswer: (req, res) => {
    let userid = req.headers.decoded.id
    const {id, answer} = req.body
    let newAnswer = Answer ({
      user: userid,
      answer
    })

    newAnswer.save()
      .then(response => {
        console.log(response)
        Post.findByIdAndUpdate({
          _id: req.body.id
        }, {
          $push: {
            answers: response._id
          }
        })
          .then(response => {
            res.status(200).send({
              message: 'Add answer to post success',
              data: response
            })
          })
          .catch(err => {
            res.status(400).send({
              message: 'Add answer to post failed',
              err: err.message
            })
          })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Add new answer to post failed',
          err: err.message
        })
      })
  },
  addComment: (req, res) => {
    let userid = req.headers.decoded.id
    const {answerid, comment} = req.body

    let newComment = Comment ({
      user: userid,
      comment
    })

    newComment.save()
      .then(response => {
        Answer.findByIdAndUpdate({
          _id: answerid
        }, {
          $push: {
            comments: response._id
          }
        })
          .then(response => {
            res.status(200).send({
              message: 'Add comment to answer success',
              data: response
            })
          })
          .catch(err => {
            res.status(400).send({
              message: 'Add comment to answer failed',
              err: err.message
            })
          })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Add comment to answer failed',
          err: err.message
        })
      })
  },
  update: (req, res) => {
    const {id} = req.params
    const {title, content, category} = req.body

    Post.findByIdAndUpdate({
      _id: id
    }, {
      title, content, category
    })
    .then(response => {
      res.status(200).send({
        message: 'Update post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Update post failed',
        err: err.message
      })
    })
  },
  remove: (req, res) => {
    const {id} = req.params

    Post.findByIdAndRemove({
      _id: id
    })
    .then(response => {
      // response.answers.forEach(answer => {
      //   Answer.findByIdAndRemove({
      //     _id: answer._id
      //   })
      // })
      res.status(200).send({
        message: 'Delete post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Delete post failed',
        err: err.message
      })
    })
  },
  removeAnswer: (req, res) => {
    const {id} = req.params

    Answer.findByIdAndRemove({
      _id: id
    })
    .then(response => {
      res.status(200).send({
        message: 'Delete post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Delete post failed',
        err: err.message
      })
    })
  },
  removeComment: (req, res) => {
    const {id} = req.params

    Comment.findByIdAndRemove({
      _id: id
    })
    .then(response => {
      res.status(200).send({
        message: 'Delete post success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Delete post failed',
        err: err.message
      })
    })
  },
  editLike: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Post
      .find({
        _id: id
      })
      .populate('user')
      .exec()
      .then(response => {
        let likes = response[0].likes;
        let adaLike = likes.indexOf(userid);
        let dislikes = response[0].dislikes;
        let adaDisike = dislikes.indexOf(userid);
        
        if(adaDisike != -1) {
          res.status(400).send({
            message: 'Sudah ada dislike'
          })
        } else {
          if (adaLike != -1) {
            action = '$pull'
          } else {
            action = '$push'
          }
          
          Post.update({
            _id:id
          }, {
            [action]: {
              likes: userid
            }
          }, {
            overwrite: false
          }, function (err, post) {
            if(!err) {
              res.status(200).send({
                message: 'edit like success'
              })
            } else {
              res.status(400).send({
                message: 'edit like failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  editDislike: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Post
      .find({
        _id: id
      })
      .populate('user')
      .exec()
      .then(response => {
        let likes = response[0].likes;
        let adaLike = likes.indexOf(userid);
        let dislikes = response[0].dislikes;
        let adaDisike = dislikes.indexOf(userid);
        
        if(adaLike != -1) {
          res.status(400).send({
            message: 'Sudah ada like'
          })
        } else {
          if (adaDisike != -1) {
            action = '$pull'
          } else {
            action = '$push'
          }
          
          Post.update({
            _id:id
          }, {
            [action]: {
              dislikes: userid
            }
          }, {
            overwrite: false
          }, function (err, post) {
            if(!err) {
              res.status(200).send({
                message: 'edit dislike success'
              })
            } else {
              res.status(400).send({
                message: 'edit dislike failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  editLikeAnswer: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Answer
      .find({
        _id: id
      })
      .populate('user')
      .exec()
      .then(response => {
        let likes = response[0].likes;
        let adaLike = likes.indexOf(userid);
        let dislikes = response[0].dislikes;
        let adaDisike = dislikes.indexOf(userid);
        
        if(adaDisike != -1) {
          res.status(400).send({
            message: 'Sudah ada dislike'
          })
        } else {
          if (adaLike != -1) {
            action = '$pull'
          } else {
            action = '$push'
          }
          
          Answer.update({
            _id:id
          }, {
            [action]: {
              likes: userid
            }
          }, {
            overwrite: false
          }, function (err, post) {
            if(!err) {isbn, title, author, category, stock
              res.status(200).send({
                message: 'edit like success'
              })
            } else {
              res.status(400).send({
                message: 'edit like failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  editDislikeAnswer: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Answer
      .find({
        _id: id
      })
      .populate('user')
      .exec()
      .then(response => {
        let likes = response[0].likes;
        let adaLike = likes.indexOf(userid);
        let dislikes = response[0].dislikes;
        let adaDisike = dislikes.indexOf(userid);
        
        if(adaLike != -1) {
          res.status(400).send({
            message: 'Sudah ada like'
          })
        } else {
          if (adaDisike != -1) {
            action = '$pull'
          } else {
            action = '$push'
          }
          
          Answer.update({
            _id:id
          }, {
            [action]: {
              dislikes: userid
            }
          }, {
            overwrite: false
          }, function (err, post) {
            if(!err) {
              res.status(200).send({
                message: 'edit dislike success'
              })
            } else {
              res.status(400).send({
                message: 'edit dislike failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  editLikeComment: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Comment
      .find({
        _id: id
      })
      .populate('user')
      .exec()
      .then(response => {
        let likes = response[0].likes;
        let adaLike = likes.indexOf(userid);
        let dislikes = response[0].dislikes;
        let adaDisike = dislikes.indexOf(userid);
        
        if(adaDisike != -1) {
          res.status(400).send({
            message: 'Sudah ada dislike'
          })
        } else {
          if (adaLike != -1) {
            action = '$pull'
          } else {
            action = '$push'
          }
          
          Comment.update({
            _id:id
          }, {
            [action]: {
              likes: userid
            }
          }, {
            overwrite: false
          }, function (err, post) {
            if(!err) {
              res.status(200).send({
                message: 'edit like success'
              })
            } else {
              res.status(400).send({
                message: 'edit like failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  editDislikeComment: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Comment
      .find({
        _id: id
      })
      .populate('user')
      .exec()
      .then(response => {
        let likes = response[0].likes;
        let adaLike = likes.indexOf(userid);
        let dislikes = response[0].dislikes;
        let adaDisike = dislikes.indexOf(userid);
        
        if(adaLike != -1) {
          res.status(400).send({
            message: 'Sudah ada like'
          })
        } else {
          if (adaDisike != -1) {
            action = '$pull'
          } else {
            action = '$push'
          }
          
          Comment.update({
            _id:id
          }, {
            [action]: {
              dislikes: userid
            }
          }, {
            overwrite: false
          }, function (err, post) {
            if(!err) {
              res.status(200).send({
                message: 'edit dislike success'
              })
            } else {
              res.status(400).send({
                message: 'edit dislike failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
}
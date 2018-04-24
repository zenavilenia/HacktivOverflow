const router = require('express').Router()
const {findAll, findById, add, addAnswer, addComment, editLike, editDislike, editLikeAnswer, editDislikeAnswer, editLikeComment, editDislikeComment, update, remove} = require('../controllers/post.controller')
const {auth} = require('../middleware/auth')

router
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', auth, add)
    .post('/addanswer', auth, addAnswer)
    .post('/addcomment', auth, addComment)
    .put('/like/:id', auth, editLike)
    .put('/dislike/:id', auth, editDislike)
    .put('/likeanswer/:id', auth, editLikeAnswer)
    .put('/dislikeanswer/:id', auth, editDislikeAnswer)
    .put('/likecomment/:id', auth, editLikeComment)
    .put('/dislikecomment/:id', auth, editDislikeComment)
    .put('/:id', update)
    .delete('/:id', remove)

module.exports = router
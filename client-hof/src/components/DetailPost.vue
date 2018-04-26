<template>
  <div>
    <div class="card mb-4" v-for="(post,i) in posts" :key="i" v-if="post._id == postid">
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-text">{{ post.content }}</p>
        <div class="row justify-content-center">
          <div class="ml-5">
            <a v-on:click="likePost(post._id)"><i class="far fa-thumbs-up grow"></i></a>
            <span class="badge badge-light">{{post.likes.length}}</span>
          </div>
          <div class="">
            <a v-on:click="dislikePost(post._id)"><i class="far fa-thumbs-down grow"></i></a>
            <span class="badge badge-light">{{post.dislikes.length}}</span>
          </div>
          <button v-if="post.user._id === userid" class="btn btn-info btn-sm" @click="changeEditThisPost(post)" data-toggle="modal" data-target="#modalEditPost">Edit</button>
          <button v-if="post.user._id === userid" class="btn btn-danger btn-sm" @click="deletePost(post._id)">Delete</button>
          <div id="modalEditPost" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" align="left">Edit Question</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                  <form class="ivu-form ivu-form-label-right">
                    <div class="form-group">
                      <label class="form-title">Title</label>
                      <div class="form-group-content">
                        <div class="">
                          <i class="validate"></i>
                          <input type="text" class="form-control" v-model="editThisPost.title">
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-title">Content</label>
                      <div class="form-group-content">
                        <div class="">
                          <i class="validate"></i>
                          <textarea rows="2" class="form-control" v-model="editThisPost.content"></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-title">Category</label>
                      <div class="form-group-content">
                        <div class="">
                          <i class="validate"></i>
                          <select class="form-control form-control-sm" data-live-search="true" v-model="editThisPost.category">
                            <option value="C++" selected>C++</option>
                            <option value="Javascript" selected>Javascript</option>
                            <option value="Python" selected>Python</option>
                            <option value="Database" selected>Database</option>
                            <option value="Mobile Apps" selected>Mobile Apps</option>
                            <option value="Others" selected>Others</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button class="btn btn-primary" @click="editQuestion" data-dismiss="modal">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <p class="comment-user">Answers:</p>
        <hr>
        <div class="card mb-4" v-for="(answer,i) in post.answers" :key="i">
          <div class="card-body">
            <p>{{ answer.answer }}</p>
            <div class="row justify-content-center">
              <div class="ml-5">
                <a v-on:click="likeAnswer(answer._id)"><i class="far fa-thumbs-up grow"></i></a>
                <span class="badge badge-light">{{answer.likes.length}}</span>
              </div>
              <div class="">
                <a v-on:click="dislikeAnswer(answer._id)"><i class="far fa-thumbs-down grow"></i></a>
                <span class="badge badge-light">{{answer.dislikes.length}}</span>
              </div>
              <button v-if="answer.user._id === userid" class="btn btn-danger btn-sm" @click="deleteAnswer(answer._id)">Delete</button>
            </div>
            <hr>
            <p class="comment-user">Comments:</p>
            <div class="card mb-4" v-for="(comment,i) in answer.comments" :key="i">
              <div class="card-body">
                {{ comment.comment }}
                <div class="row justify-content-center">
                  <div class="ml-5">
                    <a v-on:click="likeComment(comment._id)"><i class="far fa-thumbs-up grow"></i></a>
                    <span class="badge badge-light">{{comment.likes.length}}</span>
                  </div>
                  <div class="">
                    <a v-on:click="dislikeComment(comment._id)"><i class="far fa-thumbs-down grow"></i></a>
                    <span class="badge badge-light">{{comment.dislikes.length}}</span>
                  </div>
                  <button v-if="comment.user._id === userid" class="btn btn-danger btn-sm" @click="deleteComment(comment._id)">Delete</button>
                </div>
              </div>
              <div class="card-footer card-footer-answer text-muted">
                Commented on {{comment.createdAt.slice(0, 10)}} by {{comment.user.email}}
              </div>
            </div>
            <div class="comment-user">
              <textarea rows="2" cols="24" class="boxsizingBorder" v-model="newComment"></textarea> <br/>
              <button class="btn btn-sm" @click="addComment(answer._id)">Add a Comment</button>
            </div>
          </div>
          <div class="card-footer card-footer-answer text-muted">
            Answered on {{answer.createdAt.slice(0, 10)}} by {{answer.user.email}}
          </div>
        </div>
        <div class="comment-user">
          <textarea rows="4" cols="27" class="boxsizingBorder" v-model="newAnswer"></textarea> <br/>
          <button class="btn" @click="addAnswer(post._id)">Post Your Answer</button>
        </div>
      </div>
      <div class="card-footer text-muted">
        Asked on {{post.createdAt.slice(0, 10)}}; Last Update on {{post.updatedAt.slice(0, 10)}} by
        <a href="#">{{post.user.email}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Post',
  data () {
    return {
      userid: '',
      category: this.$route.params.id,
      postid: this.$route.params.postid,
      newAnswer: '',
      newComment: '',
      editThisPost: {
        id: '',
        title: '',
        content: '',
        category: ''
      }
    }
  },
  created: function () {
    this.userid = localStorage.getItem('iduser')
  },
  methods: {
    changeEditThisPost: function (post) {
      console.log('post--', post)
      this.editThisPost.id = post._id
      this.editThisPost.title = post.title
      this.editThisPost.content = post.content
      this.editThisPost.category = post.category
    },
    editQuestion: function () {
      let token = localStorage.getItem('token')
      const {id, title, content, category} = this.editThisPost
      axios.put(`http://35.187.244.238/posts/${id}`, {
        title, content, category
      }, {
        headers: {
          token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    addAnswer: function (postid) {
      let user = localStorage.getItem('token')
      if (!user) {
        alert('Login first')
      } else {
        axios.post('http://35.187.244.238/posts/addanswer/', {
          id: postid,
          answer: this.newAnswer
        }, {
          headers: {
            token: user
          }
        })
          .then(response => {
            console.log(response)
            this.newAnswer = ''
            this.$router.go()
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    addComment: function (answerid) {
      let user = localStorage.getItem('token')
      if (!user) {
        alert('Login first')
      } else {
        axios.post('http://35.187.244.238/posts/addcomment/', {
          answerid,
          comment: this.newComment
        }, {
          headers: {
            token: user
          }
        })
          .then(response => {
            console.log(response)
            this.newComment = ''
            this.$router.go()
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    likePost: function (postid) {
      let token = localStorage.getItem('token')
      axios.put(`http://35.187.244.238/posts/like/${postid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    dislikePost: function (postid) {
      let token = localStorage.getItem('token')
      axios.put(`http://35.187.244.238/posts/dislike/${postid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    likeAnswer: function (answerid) {
      let token = localStorage.getItem('token')
      axios.put(`http://35.187.244.238/posts/likeanswer/${answerid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    dislikeAnswer: function (answerid) {
      let token = localStorage.getItem('token')
      axios.put(`http://35.187.244.238/posts/dislikeanswer/${answerid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    likeComment: function (commentid) {
      let token = localStorage.getItem('token')
      axios.put(`http://35.187.244.238/posts/likecomment/${commentid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    dislikeComment: function (commentid) {
      let token = localStorage.getItem('token')
      axios.put(`http://35.187.244.238/posts/dislikecomment/${commentid}`, {}, {
        headers: {
          token: token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deletePost: function (postid) {
      let token = localStorage.getItem('token')
      axios.delete(`http://35.187.244.238/posts/${postid}`, {
        headers: {
          token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteAnswer: function (answerid) {
      let token = localStorage.getItem('token')
      axios.delete(`http://35.187.244.238/answers/${answerid}`, {
        headers: {
          token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteComment: function (commentid) {
      let token = localStorage.getItem('token')
      axios.delete(`http://35.187.244.238/comments/${commentid}`, {
        headers: {
          token
        }
      })
        .then(response => {
          console.log('berhasil', response)
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState([
      'posts'
    ])
  },
  watch: {
    $route: function (to, from) {
      this.$router.go()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-user {
  font-weight: bold;
}

.boxsizingBorder {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}

.card-footer-answer {
  text-align: right;
}

.grow {
  -webkit-transition:all 0.5s ease-out;
  -moz-transition:all 0.5s ease-out;
  -ms-transition:all 0.5s ease-out;
  -o-transition:all 0.5s ease-out;
  transition:all 0.5s ease-out;
}

.grow:hover {
  -webkit-transform:scale(1.3);
  -moz-transform:scale(1.3);
  -ms-transform:scale(1.3);
  -o-transform:scale(1.3);
  transform:scale(1.3);
}
</style>

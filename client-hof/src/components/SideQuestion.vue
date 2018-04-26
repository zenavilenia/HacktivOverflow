<template>
  <div class="card my-4 ">
    <div class="card-body flex-container">
      <div class="flex-items">{{posts.length}} questions</div>
      <div class="flex-items">
        <button type="button" class="btn btn-danger btn-md btn-logout"  data-toggle="modal"
      data-target="#modalAdd">Ask Question</button>
      </div>

      <div id="modalAdd" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" align="left">New Question</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <form class="ivu-form ivu-form-label-right">
                <div class="form-group">
                  <label class="form-title">Title</label>
                  <div class="form-group-content">
                    <div class="">
                      <i class="validate"></i>
                      <input type="text" placeholder="What's your programming question? Be specific." class="form-control" v-model="addThisQuestion.title">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-title">Content</label>
                  <div class="form-group-content">
                    <div class="">
                      <i class="validate"></i>
                      <textarea placeholder="Describe your question" rows="2" class="form-control" v-model="addThisQuestion.content"></textarea>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-title">Category</label>
                  <div class="form-group-content">
                    <div class="">
                      <i class="validate"></i>
                      <select class="form-control form-control-sm" data-live-search="true" v-model="addThisQuestion.category">
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
              <button class="btn btn-primary" @click="addQuestion" data-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'sidequestion',
  components: {
  },
  data () {
    return {
      addThisQuestion: {}
    }
  },
  methods: {
    addQuestion: function () {
      let user = localStorage.getItem('token')
      if (!user) {
        alert('please login')
      } else {
        axios.post('http://35.187.244.238/posts', {
          title: this.addThisQuestion.title,
          content: this.addThisQuestion.content,
          category: this.addThisQuestion.category
        }, {
          headers: {
            token: user
          }
        })
          .then(response => {
            console.log(response)
            this.$router.go()
          })
          .catch(err => {
            console.error(err)
          })

        // clear question form
        this.clearAddThisQuestion()
      }
    },
    clearAddThisQuestion: function () {
      this.addThisQuestion = {}
    }
  },
  computed: {
    ...mapState([
      'posts'
    ])
  }
}
</script>

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    posts: []
  },
  mutations: {
    addPost (state, payload) {
      state.posts = payload.data
    },
    insertUser (state, payload) {
      console.log('payload', payload)
      state.user = payload
    }
  },
  actions: {
    getPosts ({ commit }) {
      axios.get(`http://35.187.244.238/posts`)
        .then(response => {
          commit('addPost', response.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
})

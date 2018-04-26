import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Posts from './components/Posts'
import Post from './components/Post'
import DetailPost from './components/DetailPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: Posts,
          props: true
        },
        {
          path: ':id',
          component: Post,
          props: true
        },
        {
          path: ':id/:postid',
          component: DetailPost,
          props: true
        }
      ]
    }
  ]
})

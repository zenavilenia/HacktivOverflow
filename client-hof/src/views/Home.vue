<template>
  <div class="container">
    <Navbar></Navbar>

    <div class="row">
        <!-- Blog Entries Column -->
        <div class="col-md-8">
          <h1 class="my-4">
          </h1>
          <router-view />

          <!-- Pagination -->
          <ul class="pagination justify-content-center mb-4">
            <li class="page-item">
              <a class="page-link" href="#">&larr; Older</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#">Newer &rarr;</a>
            </li>
          </ul>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <!-- Side Question -->
          <SideQuestion></SideQuestion>

          <!-- Categories Widget -->
          <Categories></Categories>

          <!-- Side Widget -->
          <SideWidget></SideWidget>

        </div>

      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Categories from '@/components/Categories.vue'
import Post from '@/components/Post.vue'
import SideWidget from '@/components/SideWidget.vue'
import SideQuestion from '@/components/SideQuestion.vue'
import { mapState, mapActions } from 'vuex'
// import axios from 'axios'

export default {
  name: 'home',
  components: {
    Navbar,
    Post,
    Categories,
    SideWidget,
    SideQuestion
  },
  methods: {
    ...mapActions([
      'getPosts'
    ])
  },
  computed: {
    ...mapState([
      'posts'
    ])
  },
  mounted () {
    this.getPosts()
  }
}
</script>

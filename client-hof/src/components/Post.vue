<template>
  <div>
    <div class="card mb-4" v-for="(post,i) in posts" :key="i" v-if="post.category == category">
      <div class="card-body">
        <router-link :to="{ path: '/' + post.category + '/' + post._id, params: { id: post.category, postid: post._id } }">
          <h2 class="card-title">{{ post.title }}</h2>
        </router-link>
        <p class="card-text">{{ post.content }}</p>
      </div>
      <div class="card-footer text-muted">
        Asked on {{post.createdAt.slice(0, 10)}} by
        <a href="#">{{post.user.email}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Post',
  data () {
    return {
      category: this.$route.params.id
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

</style>

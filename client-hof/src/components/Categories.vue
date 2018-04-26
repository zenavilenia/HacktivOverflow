<template>
  <div class="card my-4">
    <h5 class="card-header">Categories</h5>
    <div class="card-body">
      <div class="row">
        <div class="col-lg-6">
          <ul class="list-unstyled mb-0">
            <li>
              <a><router-link :to="{ path: '/C++', params: { id: 'C++' } }">C++</router-link></a>
            </li>
            <li>
              <a><router-link :to="{ path: '/Javascript', params: { id: 'Javascript' } }">Javascript</router-link></a>
            </li>
            <li>
              <a><router-link :to="{ path: '/Python', params: { id: 'Python' } }">Python</router-link></a>
            </li>
          </ul>
        </div>
        <div class="col-lg-6">
          <ul class="list-unstyled mb-0">
            <li>
              <a><router-link :to="{ path: '/Database', params: { id: 'Database' } }">Database</router-link></a>
            </li>
            <li>
              <a><router-link :to="{ path: '/Mobile Apps', params: { id: 'Mobile Apps' } }">Mobile Apps</router-link></a>
            </li>
            <li>
              <a><router-link :to="{ path: '/Others', params: { id: 'Others' } }">Others</router-link></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'categories',
  components: {
  }
}
</script>

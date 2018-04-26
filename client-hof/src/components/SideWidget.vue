<template>
  <div class="card my-4">
    <h5 class="card-header">Side Widget</h5>
    <div class="card-body">
      <div style="text-align:center;padding:1em 0;"> <h3><span style="color:gray;">Current local time in</span><br />Jakarta, Indonesia</h3> <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=Asia%2FJakarta" width="100%" height="115" frameborder="0" seamless></iframe> </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'sidewidget',
  components: {
  }
}
</script>

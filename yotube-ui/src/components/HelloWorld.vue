<template>
  <div id="app">
    <video
      controls
      autoplay
      playsinline
      ref="video"
      muted
    ></video>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function () {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 1080,
        height: 720
      }
    }).then(stream => {
      this.$refs.video.srcObject = stream
      console.log(stream)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

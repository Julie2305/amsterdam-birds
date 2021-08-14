<template>
  <div id="app">
    <Map />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Map from './components/Map.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Map,
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>

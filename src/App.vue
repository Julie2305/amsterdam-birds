<template>
  <div id="app">
    <Map />
    <Birds />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Map, Birds } from './components'

export default Vue.extend({
  name: 'App',
  components: {
    Map,
    Birds,
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

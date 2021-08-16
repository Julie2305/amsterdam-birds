<template>
  <div id="app">
    <Map />
    <NumberOfBirds />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Map, NumberOfBirds } from './components'

export default Vue.extend({
  name: 'App',
  components: {
    Map,
    NumberOfBirds,
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

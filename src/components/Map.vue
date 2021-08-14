<template>
<div>
  <h1>Map</h1>
  <div id="map" class="map"></div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import mapboxgl, { LngLatLike } from 'mapbox-gl'

export default Vue.extend({
  name: 'Map',
  data () {
    return {
      amsterdamCoordinates: [4.897070, 52.377956] as LngLatLike,
      accessToken: 'pk.eyJ1IjoianVsaWUtdCIsImEiOiJja3M3bmUwcHozajhlMnBzN3Jhd2xtcjFwIn0.LtJWuvdjFsdew2D2aEs18A',
    }
  },
  mounted () {
    mapboxgl.accessToken = this.accessToken
    // eslint-disable-next-line
    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.amsterdamCoordinates,
      zoom: 12,
    })
  },
})
</script>

<style scoped lang="scss">
.map {
  position: absolute;
  width: 50%;
  height: 50%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
</style>

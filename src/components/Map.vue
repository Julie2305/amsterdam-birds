<template>
<div>
  <div class="map-wrapper">
    <div id="map" class="map"></div>
  </div>
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
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.amsterdamCoordinates,
      zoom: 12,
    })

    map.addControl(new mapboxgl.NavigationControl())
  },
})
</script>

<style scoped lang="scss">
.map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.map-wrapper {
  width: 50%;
  padding-bottom: 35%;
  position: relative;
  left: 25%
}
</style>

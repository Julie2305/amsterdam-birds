<template>
<div>
  <div class="map-wrapper">
    <div id="map" class="map"></div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import mapboxgl, { LngLatLike } from 'mapbox-gl'
import { Bird } from '@/types'

export default Vue.extend({
  name: 'Map',
  data () {
    return {
      map: Object as any,
      amsterdamCoordinates: [4.897070, 52.377956] as LngLatLike,
      accessToken: 'pk.eyJ1IjoianVsaWUtdCIsImEiOiJja3M3bmUwcHozajhlMnBzN3Jhd2xtcjFwIn0.LtJWuvdjFsdew2D2aEs18A',
    }
  },
  watch: {
    selectedBird: function (val) {
      this.birdsByType[val].birds.forEach((bird: Bird) => {
        new mapboxgl.Marker({ color: this.birdsByType[val].color })
          .setLngLat(bird.geometry.coordinates)
          .addTo(this.map)
      })
    },
  },
  computed: {
    ...mapState(['birds', 'birdsByType', 'selectedBird']),
  },
  mounted () {
    mapboxgl.accessToken = this.accessToken
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.amsterdamCoordinates,
      zoom: 12,
    })

    this.map.addControl(new mapboxgl.NavigationControl())
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

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
import { Bird, BirdEnum } from '@/types'
import { TypeOfBirds } from '@/constants'

export default Vue.extend({
  name: 'Map',
  data () {
    return {
      map: Object as any,
      amsterdamCoordinates: [4.897070, 52.377956] as LngLatLike,
      accessToken: 'pk.eyJ1IjoianVsaWUtdCIsImEiOiJja3M3bmUwcHozajhlMnBzN3Jhd2xtcjFwIn0.LtJWuvdjFsdew2D2aEs18A',
      markers: { ...TypeOfBirds },
    }
  },
  watch: {
    selectedBirds: function (newVal, oldVal) {
      newVal.length < oldVal.length ? this.removeBird(this.latestChangedBird) : this.addBird(this.latestChangedBird)
    },
  },
  computed: {
    ...mapState(['birdsByType', 'selectedBirds', 'latestChangedBird']),
  },
  mounted () {
    mapboxgl.accessToken = this.accessToken
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.amsterdamCoordinates,
      zoom: 10,
    })

    this.map.addControl(new mapboxgl.NavigationControl())
  },
  methods: {
    addBird (addedBird: BirdEnum) : void {
      this.markers[addedBird].markers = this.birdsByType[addedBird].birds.map((bird: Bird) => {
        return new mapboxgl.Marker({ color: this.birdsByType[addedBird].color })
          .setLngLat(bird.geometry.coordinates)
          .addTo(this.map) as mapboxgl.Marker
      })
    },
    removeBird (removedBird: BirdEnum) : void {
      this.markers[removedBird].markers.forEach(marker => marker.remove())
    },
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

<template>
<div>
  <div class="map-wrapper">
    <div id="map" class="map"></div>
    <nav id="filter-group" class="filter-group">
      <div v-for="item in birdsByType" :key="item.type">
        <input
          type="checkbox"
          :id="item.type"
          :value="item.type"
          @change="birdChecked($event)"
        />
        <label :for="item.type">{{ item.type }}</label>
        <div :style="`background-color: ${item.color}`" class="color-box"></div>
      </div>
    </nav>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import mapboxgl from 'mapbox-gl'
import { TypeOfBird } from '@/types'

export default Vue.extend({
  name: 'Map',
  data () {
    return {
      map: Object as any,
      amsterdamCoordinates: [4.897070, 52.377956] as mapboxgl.LngLatLike,
      accessToken: 'pk.eyJ1IjoianVsaWUtdCIsImEiOiJja3M3bmUwcHozajhlMnBzN3Jhd2xtcjFwIn0.LtJWuvdjFsdew2D2aEs18A',
    }
  },
  computed: {
    ...mapState(['birds', 'birdsByType']),
  },
  async mounted () {
    mapboxgl.accessToken = this.accessToken
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.amsterdamCoordinates,
      zoom: 10,
    })

    this.fetchBirds().then(() => {
      const data = this.birds
      this.map.on('load', () => {
        this.map.addSource('birds', {
          type: 'geojson',
          data,
        })
        console.log(this.birdsByType)
        this.birdsByType.forEach((bird: TypeOfBird) => {
          this.map.addLayer({
            id: bird.type,
            type: 'circle',
            source: 'birds',
            paint: {
              'circle-radius': 5,
              'circle-color': bird.color,
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              'circle-opacity': 0.5,
            },
            filter: ['==', 'Vogel', bird.type],
            layout: {
              visibility: 'none',
            },
          })
        })
      })
    })
    const navigation = new mapboxgl.NavigationControl()
    this.map.addControl(navigation, 'top-left')
  },
  methods: {
    ...mapActions(['fetchBirds', 'updateSelectedBirds']),
    birdChecked (event: Event) : void {
      const target = event.target as HTMLInputElement
      this.map.setLayoutProperty(
        target.value,
        'visibility',
        target.checked ? 'visible' : 'none',
      )
      this.updateSelectedBirds(target)
    },
  },
})
</script>

<style lang="scss">
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

.filter-group {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  width: 180px;
  color: #fff;
  background-color: #3386c0;
}

.color-box {
  margin-left: 5px;
  width: 13px;
  height: 13px;
  display: inline-block;
}

</style>

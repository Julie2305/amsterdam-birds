<template>
  <div>
  <p v-if="fetchingBirds">De vogels worden geladen...</p>
  <p v-else-if="fetchBirdsFailed">Er is een fout opgetreden</p>
  <div v-else>
    <div v-for="(item, name) in birdsByType" :key=name class="flex-box">
      <input
        type="checkbox"
        :id="name"
        :value="name"
        @change="updateSelectedBirds($event)"
      />
      <label :for="name">{{ name }} ( {{ item.birds.length }} )</label>
      <div :style="`background-color: ${item.color}`" class="color-box"></div>
    </div>
  </div>
  <p> Totaal aantal getoonde volgels: {{ totalSelectedBirds }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { BirdEnum } from '@/types'

export default Vue.extend({
  name: 'Birds',
  computed: {
    ...mapState(['fetchingBirds', 'fetchBirdsFailed', 'birdsByType', 'selectedBirds']),
    totalSelectedBirds () : number {
      let number = 0
      this.selectedBirds.forEach((bird: BirdEnum) => {
        number = number + this.birdsByType[bird].birds.length
      })
      return number
    },
  },
  mounted () {
    // this.fetchBirds()
  },
  methods: {
    ...mapActions(['fetchBirds', 'updateSelectedBirds']),
  },
})
</script>

<style lang="scss">
.flex-box {
  display: flex;
  align-items: baseline;
  justify-content: center;
}
</style>

<template>
  <div>
  <p v-if="fetchingBirds">De vogels worden geladen...</p>
  <p v-else-if="fetchBirdsFailed">Er is een fout opgetreden</p>
  <div v-else>
    <div v-for="item in birdsByType" :key=item.type>
      {{ item.type }} ( {{ item.birds.length }} )
    </div>
  </div>
  <p> Totaal aantal getoonde volgels: {{ totalSelectedBirds }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { BirdEnum, TypeOfBird } from '@/types'

export default Vue.extend({
  name: 'Birds',
  computed: {
    ...mapState(['fetchingBirds', 'fetchBirdsFailed', 'birdsByType', 'selectedBirds']),
    totalSelectedBirds () : number {
      let number = 0
      this.selectedBirds.forEach((selectedBird: BirdEnum) => {
        number = number + this.birdsByType.find((birdByType: TypeOfBird) => birdByType.type === selectedBird).birds.length
      })
      return number
    },
  },
})
</script>

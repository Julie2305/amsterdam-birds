<template>
  <div>
  <p v-if="fetchingBirds">De vogels worden geladen...</p>
  <p v-else-if="fetchBirdsFailed">Er is een fout opgetreden</p>
  <div v-else>
    <div v-for="(birds, name) in birdsByType" :key=name>
      <input type="checkbox" :id="name"/>
      <label :for="name">{{ name }} ( {{ birds.length }} )</label>
    </div>
    <input type="checkbox" id="total-birds"/>
    <label for="total-birds">Alle vogels {{ `${birds.length}` }} </label>
  </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Birds',
  computed: {
    ...mapState(['birds', 'typeOfBirds', 'fetchingBirds', 'fetchBirdsFailed', 'birdsByType']),
  },
  mounted () {
    this.fetchBirds()
  },
  methods: {
    ...mapActions(['fetchBirds']),
  },
}
</script>

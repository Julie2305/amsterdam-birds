<template>
  <div>
  <p v-if="fetchingBirds">De vogels worden geladen...</p>
  <p v-else-if="fetchBirdsFailed">Er is een fout opgetreden</p>
  <div v-else>
    <div v-for="(item, name) in birdsByType" :key=name class="flex-box">
      <input
        type="radio"
        :id="name"
        name="birds"
        v-model="selected"
        v-bind:value="name"
      />
      <label :for="name">{{ name }} ( {{ item.birds.length }} )</label>
      <div :style="`background-color: ${item.color}`" class="color-box"></div>
    </div>
    <input type="radio" id="total-birds" name="birds"/>
    <label for="total-birds">Alle vogels {{ `${birds.length}` }} </label>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { Bird, BirdEnum } from '@/types'

export default Vue.extend({
  name: 'Birds',
  computed: {
    ...mapState(['birds', 'typeOfBirds', 'fetchingBirds', 'fetchBirdsFailed', 'birdsByType', 'selectedBird']),
    selected: {
      get (): Bird {
        return this.selectedBird
      },
      set (value: BirdEnum): void {
        this.$store.commit('selectionUpdated', value)
      },
    },
  },
  mounted () {
    this.fetchBirds()
  },
  methods: {
    ...mapActions(['fetchBirds']),
  },
})
</script>

<style lang="scss">
.color-box {
  margin-left: 5px;
  width: 13px;
  height: 13px;
}
.flex-box {
  display: flex;
  align-items: baseline;
  justify-content: center;
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'
import { getBirds } from '@/api'
import { Bird, BirdEnum } from '@/types'
import { TypeOfBirds } from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fetchingBirds: false,
    birds: [] as Array<Bird>,
    fetchBirdsFailed: false,
    birdsByType: TypeOfBirds,
    selectedBirds: [] as Array<BirdEnum>,
    latestChangedBird: '' as BirdEnum,
  },
  mutations: {
    fetchBirdsStarted (state) {
      state.fetchBirdsFailed = false
      state.fetchingBirds = true
    },
    fetchBirdsSucceeded (state, birds: Array<Bird>) {
      state.fetchingBirds = false
      state.birds = birds
      birds.forEach(bird => {
        if (bird.properties.Vogel in state.birdsByType) {
          state.birdsByType[bird.properties.Vogel].birds.push(bird)
        } else {
          state.birdsByType.Overig.birds.push(bird)
        }
      })
    },
    fetchBirdsFailed (state) {
      state.fetchingBirds = false
      state.fetchBirdsFailed = true
    },
    birdAdded (state, addedBird: BirdEnum) {
      state.latestChangedBird = addedBird
      state.selectedBirds.push(addedBird)
    },
    birdRemoved (state, removedBird: BirdEnum) {
      state.latestChangedBird = removedBird
      state.selectedBirds = state.selectedBirds.filter((selectedBird) => selectedBird !== removedBird)
    },
  },
  actions: {
    async fetchBirds ({ commit }): Promise<void> {
      commit('fetchBirdsStarted')
      getBirds().then((birds) => {
        commit('fetchBirdsSucceeded', birds)
      }).catch(() => {
        commit('fetchBirdsFailed')
      })
    },
    updateSelectedBirds ({ commit }, event: Event): void {
      const target = event.target as HTMLInputElement
      target.checked ? commit('birdAdded', target.value) : commit('birdRemoved', target.value)
    },
  },
})

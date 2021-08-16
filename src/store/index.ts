import Vue from 'vue'
import Vuex from 'vuex'
import { getBirds } from '@/api'
import { TypeOfBird, BirdEnum, Bird, BirdResponse } from '@/types'
import { typeOfBirds } from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fetchingBirds: false,
    birds: {} as BirdResponse,
    fetchBirdsFailed: false,
    birdsByType: typeOfBirds,
    selectedBirds: [] as Array<BirdEnum>,
    latestChangedBird: '' as BirdEnum,
  },
  mutations: {
    fetchBirdsStarted (state) {
      state.fetchBirdsFailed = false
      state.fetchingBirds = true
    },
    fetchBirdsSucceeded (state, birds: BirdResponse) {
      state.fetchingBirds = false
      state.birds = birds
      birds.features.forEach(bird => {
        const knownType = state.birdsByType.find(birdType => birdType.type === bird.properties.Vogel)
        if (knownType) {
          knownType.birds.push(bird)
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
      return getBirds().then((birds) => {
        commit('fetchBirdsSucceeded', birds)
      }).catch(() => {
        commit('fetchBirdsFailed')
      })
    },
    updateSelectedBirds ({ commit }, target: HTMLInputElement): void {
      target.checked ? commit('birdAdded', target.value) : commit('birdRemoved', target.value)
    },
  },
})

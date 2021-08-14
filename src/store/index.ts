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
    // typeOfBirds: TypeOfBirds,
    birdsByType: TypeOfBirds,
    selectedBird: '', // type!!
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
    selectionUpdated (state, value) {
      state.selectedBird = value
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
  },
})

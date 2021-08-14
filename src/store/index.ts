import Vue from 'vue'
import Vuex from 'vuex'
import { getBirds } from '@/api'
import { Bird } from '@/types'
import { TypeOfBirds } from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fetchingBirds: false,
    birds: [] as Array<Bird>,
    fetchBirdsFailed: false,
    typeOfBirds: TypeOfBirds,
    birdsByType: {
      Gierzwaluw: [] as Array<Bird>,
      Boerenzwaluw: [] as Array<Bird>,
      Huiszwaluw: [] as Array<Bird>,
      Huismus: [] as Array<Bird>,
      Spreeuw: [] as Array<Bird>,
      Overig: [] as Array<Bird>,
    },
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
          state.birdsByType[bird.properties.Vogel].push(bird)
        } else {
          state.birdsByType.Overig.push(bird)
        }
      })
    },
    fetchBirdsFailed (state) {
      state.fetchingBirds = false
      state.fetchBirdsFailed = true
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

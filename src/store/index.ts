import Vue, { PropType } from 'vue'
import Vuex from 'vuex'
import { getBirds } from '@/api'
import { Bird } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingBirds: false,
    birds: [] as Array<Bird>,
    fetchBirdsFailed: false,
  },
  mutations: {
    fetchBirdsStarted (state) {
      state.fetchBirdsFailed = false
      state.loadingBirds = true
    },
    fetchBirdsSucceeded (state, birds: Array<Bird>) {
      state.loadingBirds = false
      state.birds = birds
    },
    fetchBirdsFailed (state) {
      state.loadingBirds = false
      state.fetchBirdsFailed = true
    },
  },
  actions: {
    fetchBirds ({ commit }): void {
      commit('fetchBirdsStarted')
      getBirds().then((birds) => {
        commit('fetchBirdsSucceeded', birds)
        console.log(birds)
        console.log('success')
      }).catch(() => {
        commit('fetchBirdsFailed')
        console.log('error')
      })
    },
  },
})

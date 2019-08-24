// import myPlugin from 'myPlugin'
// export const plugins = [ myPlugin ]

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
// actions: {
//   async nuxtServerInit({ dispatch }) {
//     await dispatch('core/load')
//   }
// },

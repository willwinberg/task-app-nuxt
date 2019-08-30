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
// When we have date in the store we want to give directly to the client
// nuxtServerInit ({ commit }, { req }) {
//   if (req.session.user) {
//     commit('user', req.session.user)
//   }
// }
// },

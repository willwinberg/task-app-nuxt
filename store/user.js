import EventService from '@/services/EventService.js'
// state must return an anonymous function. Otherwise the same state would be shared across ALL requests
export const state = () => ({
    users: ['Will', 'Noob', 'Death']
})

export const mutations = {
    SET_EVENTS(state, users) {
        state.users = users
    },
    SET_EVENT(state, user) {
        state.user = user
    }
}

export const actions = {
    fetchUsers({ commit }) {
        return this.$axios.get('/api/users').then((response) => {
            commit('SET_EVENTS', response.data)
        })
    },
    fetchUser({ commit }, id) {
        return EventService.getEvent(id).then((response) => {
            commit('SET_EVENT', response.data)
        })
    }
}

// import EventService from '@/services/EventService.js'
// state must return an anonymous function. Otherwise the same state would be shared across ALL requests
export const state = () => ({ user: null })

export const mutations = {
    SET_USERS(state, users) {
        state.users = users
    },
    SET_USER(state, user) {
        state.user = user
    },
    ADD_USER(state, user) {
        state.user = user
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.session && req.session.authUser) {
            commit('SET_USER', req.session.authUser)
        }
    },
    login() {},
    register({ commit }, data) {
        return this.$axios
            .post('/api/users', data)
            .then((response) => {
                commit('SET_USER', response.data)
                return response.data
            })
            .catch((e) => {
                return e.response
            })
    },
    fetchUsers({ commit }) {
        return this.$axios.get('/api/users').then((response) => {
            commit('SET_USERS', response.data)
        })
    },
    fetchUser({ commit }, id) {
        return this.$axios.get('/api/users/:id', id).then((response) => {
            commit('SET_USER', response.data)
        })
    }
}

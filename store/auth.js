import axios from 'axios'

export const state = () => ({
    user: null
})

export const mutations = {
    SET_USER(store, data) {
        store.user = data
    },
    RESET_USER(store) {
        store.user = null
    }
}

export const actions = {
    async fetchData({ commit }) {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/users/account'
            )
            commit('SET_USER', response.data.doc)
            return response
        } catch (err) {
            commit('RESET_USER')
        }
    }
}

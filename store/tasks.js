import axios from 'axios'

export const state = () => ({
    myTasks: [],
    unassignedTasks: []
})

export const mutations = {
    SET_TASKS(state, tasks) {
        state.myTasks = tasks
    },
    SET_UNASSIGNED_TASKS(state, tasks) {
        state.unassignedTasks = tasks
    },
    SET_TASK(state, task) {
        state.task = task
    },
    ADD_TASK(state, task) {
        // api stuff
    }
}
export const actions = {
    fetchTasks({ commit }) {
        return axios.get('api/tasks').then((response) => {
            commit('SET_TASKS', response.data)
        })
    },
    fetchUnassignedTasks({ commit }) {
        return axios.get('api/tasks/unassigned').then((response) => {
            console.log('unassigned', response.data)
            commit('SET_UNASSIGNED_TASKS', response.data)
        })
    },
    fetchTask({ commit }, id) {
        return axios.get('/tasks/:id', id).then((response) => {
            commit('SET_TASK', response.data)
        })
    },
    async addTask({ commit }) {
        commit('taskAdded', await this.ADD_TASK)
    }
}
export const computed = {
    // compute derived state based on store state,
}

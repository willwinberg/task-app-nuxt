export const state = () => ({
    tasks: []
})

const api = 'dogs'

export const mutations = {
    SET_TASKS(state, tasks) {
        state.tasks = tasks
    },
    SET_TASK(state, task) {
        state.task = task
    }
}
export const actions = {
    fetchTasks({ commit }) {
        return api.get('/tasks').then((response) => {
            commit('SET_TASKS', response.data)
        })
    },
    fetchTask({ commit }, id) {
        return api.get('/task/:id', id).then((response) => {
            commit('SET_TASK', response.data)
        })
    }
}

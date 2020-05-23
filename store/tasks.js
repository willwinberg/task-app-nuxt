import axios from 'axios'

export const state = () => ({
    myTasks: [],
    unassignedTasks: [],
    title: ''
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
    },
    UPDATE_TASK(state, task) {
        // api stuff
    },
    DELETE_TASK(state, task) {
        // api stuff
    },
    SET_TITLE(state, title) {
        state.title = title
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
        return axios.get('api/tasks/:id', id).then((response) => {
            commit('SET_TASK', response.data)
        })
    },
    addTask({ commit }, task) {
        return axios.post('api/tasks', task).then((response) => {
            commit('ADD_TASK', response.task)
        })
    },
    updateTask({ commit }, payload) {
        return axios.put('api/tasks', payload).then((response) => {
            commit('UPDATE_TASK', response.task)
        })
    },
    deleteTask({ commit }, id) {
        return axios
            .delete('api/tasks', { params: { id } })
            .then((response) => {
                commit('DELETE_TASK', response.taskId)
            })
    }
}
export const getters = {
    getTitle(state) {
        return state.title
    }
}

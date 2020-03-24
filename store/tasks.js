import axios from 'axios'

export const state = () => ({
    myTasks: [
        {
            id: 456789,
            priority: 'highest',
            title: 'do backend',
            description: 'we need to complete the entire backend of this app',
            assignee: 'Will',
            reporter: 'Brad',
            site: 'PlumbersStock',
            type: 'Task',
            points: 100,
            status: 'In Progress'
        },
        {
            id: 347898,
            priority: 'highest',
            title: 'do backend',
            description: 'we need to complete the entire backend of this app',
            assignee: 'Will',
            reporter: 'Brad',
            site: 'PlumbersStock',
            type: 'Task',
            points: 100,
            status: 'In Progress'
        },
        {
            id: 54901,
            priority: 'highest',
            title: 'do backend',
            description: 'we need to complete the entire backend of this app',
            assignee: 'Will',
            reporter: 'Brad',
            site: 'PlumbersStock',
            type: 'Task',
            points: 100,
            status: 'In Progress'
        }
    ],
    browse: []
})

export const mutations = {
    SET_TASKS(state, tasks) {
        state.myTasks = tasks
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

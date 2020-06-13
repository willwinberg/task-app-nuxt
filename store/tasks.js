import axios from 'axios'

export const state = () => ({
    // myTasks: [],
    columns: {},
    unassignedTasks: [],
    title: ''
})

// 'In Progress': {
//     key: 1,
//         title: 'In Progress',
//         tasks: []
// },

export const mutations = {
    SET_TASKS(state, tasks) {
        const columnsObj = {}
        let columnKey = 0

        tasks.forEach((task) => {
            const columnName = task.status

            if (columnsObj.hasOwnProperty(task.status)) {
                columnsObj[columnName].tasks.push(task)
            } else {
                columnsObj[columnName] = {
                    key: columnKey,
                    title: columnName,
                    tasks: []
                }
                columnKey++
            }
        })
        // puts the tasks in order by their 'index' value
        Object.keys(columnsObj).forEach((columnTitle) => {
            columnsObj[columnTitle].tasks.sort((a, b) => a.index > b.index)
        })

        state.columns = columnsObj
    },
    SET_UNASSIGNED_TASKS(state, tasks) {
        state.unassignedTasks = tasks
    },
    SET_TASK(state, task) {
        state.task = task
    },
    ADD_TASK(state, task) {
        if (task.assignee === this.$auth.user._id) {
            state.myTasks.push(task)
        } else {
            state.unassignedTasks.push(task)
        }
    },
    UPDATE_TASK(state, taskToEdit) {
        if (taskToEdit.assignee === this.$auth.user._id) {
            state.myTasks = state.myTasks.map((task) => {
                if (task._id === taskToEdit._id) {
                    return taskToEdit
                } else {
                    return task
                }
            })
        } else {
            state.unassignedTasks = state.unassignedTasks.map((task) => {
                if (task._id === taskToEdit._id) {
                    return taskToEdit
                } else {
                    return task
                }
            })
        }
    },
    MOVE_TASK(state, payload) {
        const { fromColumnTasks, fromColumnTitle, toColumnTasks } = payload

        state.columns[fromColumnTitle].tasks = fromColumnTasks
        state.columns[toColumnTasks[0].status].tasks = toColumnTasks
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
            commit('UPDATE_TASK', response.data.updatedTask)
        })
    },
    moveTask({ commit }, payload) {
        return axios.put('api/tasks/move', payload).then((response) => {
            const {
                fromColumnTasks,
                fromColumnTitle,
                toColumnTasks
            } = response.data

            commit('MOVE_TASK', {
                fromColumnTasks,
                fromColumnTitle,
                toColumnTasks
            })
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
    getColumns(state) {
        return state.columns
    },
    getTitle(state) {
        return state.title
    }
}

<template>
    <v-row>
        <v-col v-for="key in Object.keys(columns)" :key="key">
            <Column :column="columns[key]" />
        </v-col>
    </v-row>
</template>

<script>
import Column from './Column'
export default {
    components: {
        Column
    },
    data: () => ({
        columns: {
            Backlog: {
                key: 'todo',
                title: 'Todo',
                tasks: []
            },
            'In Progress': {
                key: 'doing',
                title: 'Doing',
                tasks: []
            },
            Done: {
                key: 'done',
                title: 'Done',
                tasks: []
            },
            'To Do': {
                key: 'todo2',
                title: 'To Do',
                tasks: []
            }
        }
    }),
    async created() {
        await this.$store.dispatch('tasks/fetchTasks')
        await this.$store.dispatch('user/fetchUsers')
        this.loadColumnsWithTasks()
    },
    methods: {
        loadColumnsWithTasks() {
            this.$store.state.tasks.myTasks.forEach((task) => {
                this.columns[task.status].tasks.push(task)
            })
        }
    }
}
</script>

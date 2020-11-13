<template>
    <TasksList :tasks="unassignedTasks" :title="'Unassigned Tasks'" />
</template>

<script>
import TasksList from '@/components/TasksList'

export default {
    name: 'BrowsePage',
    components: {
        TasksList
    },
    head: () => ({
        title: 'Browse'
    }),
    data() {
        return {
            unassignedTasks: []
        }
    },
    async created() {
        await this.$store.dispatch('tasks/fetchUnassignedTasks')
        this.unassignedTasks = this.$store.getters['tasks/getUnassignedTasks']
    }
}
</script>

<template>
    <TasksList :tasks="archivedTasks" :title="'Archived Tasks'" />
</template>

<script>
import TasksList from '@/components/TasksList'

export default {
    name: 'AllPage',
    components: {
        TasksList
    },
    head: () => ({
        title: 'Archived'
    }),
    data() {
        return {
            archivedTasks: []
        }
    },
    async created() {
        await this.$store.dispatch('tasks/fetchArchivedTasks')
        this.archivedTasks = this.$store.getters['tasks/getArchivedTasks']
    }
}
</script>

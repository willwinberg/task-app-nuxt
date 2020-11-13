<template>
    <TasksList :tasks="othersTasks" :title="'All Tasks'" />
</template>

<script>
import TasksList from '@/components/TasksList'

export default {
    name: 'AllPage',
    components: {
        TasksList
    },
    head: () => ({
        title: 'All'
    }),
    data() {
        return {
            othersTasks: []
        }
    },
    async created() {
        await this.$store.dispatch('tasks/fetchOthersTasks')
        this.tasks = this.$store.getters['tasks/getOthersTasks']
    }
}
</script>

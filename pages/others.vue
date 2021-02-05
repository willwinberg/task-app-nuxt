<template>
    <TasksList
        :tasks="$store.getters['tasks/getOthersTasks']"
        :title="'All Tasks'"
    />
</template>

<script>
import TasksList from '@/components/TasksList'

export default {
    name: 'AllPage',
    components: {
        TasksList
    },
    head: () => ({
        title: 'All Tasks'
    }),
    async created() {
        await this.$store.dispatch('tasks/fetchOthersTasks')
    }
}
</script>

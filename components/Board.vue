<template>
    <v-row>
        <v-col v-for="(column, i) in columns" :key="i">
            <Column :column="column" />
        </v-col>
    </v-row>
</template>

<script>
import Column from './Column'

export default {
    fetch({ store }) {
        return store.dispatch('tasks/fetchTasks')
    },
    components: {
        Column
    },
    data: () => ({
        columns: [
            {
                title: 'Todo'
            },
            {
                title: 'Doing'
            },
            {
                title: 'Done'
            }
        ]
    }),
    computed: {
        get() {
            return this.$store.state.lists
        },
        set(value) {
            return this.$store.commit('updateList', value)
        }
    }
}
</script>

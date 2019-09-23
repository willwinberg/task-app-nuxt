<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="(column, i) in columns" :key="i">
                <Column :column="column" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Column from './Column'

export default {
    components: {
        Column
    },
    data: () => ({
        columns: [
            {
                title: 'TODO'
            },
            {
                title: 'Doing'
            },
            {
                title: 'Done'
            }
        ]
    })
}
</script>

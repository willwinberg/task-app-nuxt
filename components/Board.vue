<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-row
                    v-for="(column, i) in columns"
                    :key="i"
                    :align="center"
                    :justify="center"
                >
                    <Column :column="column" />
                </v-row>
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

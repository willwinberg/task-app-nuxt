<template>
    <v-card max-width="400" class="mx-auto">
        <v-system-bar color="pink darken-2"></v-system-bar>

        <v-app-bar dark color="pink">
            <v-app-bar-nav-icon v-text="column.title"></v-app-bar-nav-icon>

            <v-toolbar-title :column="column"></v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar>

        <v-container class="pa-2" fluid>
            <v-row>
                <v-col v-for="(task, i) in tasks" :key="i">
                    <TaskCard :task="task" />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import TaskCard from './TaskCard'

export default {
    props: {
        column: Object
    },
    components: {
        TaskCard
    },
    data: () => ({
        tasks: [
            {
                color: '#1F7087',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                title: 'Supermodel',
                artist: 'Foster the People'
            },
            {
                color: '#952175',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'Halcyon Days',
                artist: 'Ellie Goulding'
            }
        ]
    })
}
</script>

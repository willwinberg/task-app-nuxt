<template>
    <v-card max-width="400" class="mx-auto">
        <v-system-bar color="blue darken-2"></v-system-bar>

        <v-app-bar dark color="blue">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title
                :column="column"
                v-text="column.title"
            ></v-toolbar-title>

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
                priority: 'highest',
                src: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                title: 'do backend',
                description:
                    'we need to complete the entire backend of this app'
            },
            {
                priority: 'medium',
                src: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                title: 'do frontend',
                description:
                    'we need to complete the entire frontend of this app'
            }
        ]
    })
}
</script>

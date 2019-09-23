<template>
    <v-card max-width="400" class="mx-auto">
        <v-system-bar color="blue-grey darken-2"></v-system-bar>

        <v-app-bar dark color="blue-grey">
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
            <AddTaskForm />
        </v-container>
    </v-card>
</template>

<script>
import TaskCard from './TaskCard'
import AddTaskForm from './AddTaskForm'

export default {
    components: {
        AddTaskForm,
        TaskCard
    },
    props: {
        column: Object
    },
    data: () => ({
        tasks: [
            {
                priority: 'highest',
                title: 'do backend',
                description:
                    'we need to complete the entire backend of this app',
                assignee: 'Will',
                reporter: 'Brad',
                site: 'plumbersstock',
                type: 'Task',
                points: 100,
                status: 'In Progress'
            },
            {
                priority: 'highest',
                title: 'do backend',
                description:
                    'we need to complete the entire backend of this app',
                assignee: 'Will',
                reporter: 'Brad',
                site: 'plumbersstock',
                type: 'Task',
                points: 100,
                status: 'In Progress'
            },
            {
                priority: 'highest',
                title: 'do backend',
                description:
                    'we need to complete the entire backend of this app',
                assignee: 'Will',
                reporter: 'Brad',
                site: 'plumbersstock',
                type: 'Task',
                points: 100,
                status: 'In Progress'
            }
        ]
    })
}
</script>

<template>
    <v-card max-width="400" class="mx-auto">
        <v-app-bar color="blue-grey">
            <v-btn icon>
                <v-icon>mdi-settings</v-icon>
            </v-btn>
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
                <v-col>
                    <draggable
                        v-model="list"
                        :list="list.title"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                        @change="log"
                        class="list-group pl-0"
                        group="tasks"
                        tag="ul"
                    >
                        <transition-group
                            :name="!drag ? 'flip-list' : null"
                            type="transition"
                        >
                            <li
                                v-for="task in list"
                                :key="task.task.id"
                                class="list-group-item"
                            >
                                <i
                                    :class="
                                        task.fixed
                                            ? 'fa fa-anchor'
                                            : 'glyphicon glyphicon-pushpin'
                                    "
                                    @click="task.fixed = !task.fixed"
                                    aria-hidden="true"
                                ></i>
                                <TaskCard :task="task.task" />
                            </li>
                        </transition-group>
                    </draggable>
                </v-col>
            </v-row>
            <AddTaskForm />
        </v-container>
    </v-card>
</template>

<script>
import draggable from 'vuedraggable'
import TaskCard from './TaskCard'
import AddTaskForm from './AddTaskForm'

const tasks = [
    {
        id: 456789,
        priority: 'highest',
        title: 'do backend',
        description: 'we need to complete the entire backend of this app',
        assignee: 'Will',
        reporter: 'Brad',
        site: 'PlumbersStock',
        type: 'Task',
        points: 100,
        status: 'In Progress'
    },
    {
        id: 347898,
        priority: 'highest',
        title: 'do backend',
        description: 'we need to complete the entire backend of this app',
        assignee: 'Will',
        reporter: 'Brad',
        site: 'PlumbersStock',
        type: 'Task',
        points: 100,
        status: 'In Progress'
    },
    {
        id: 54901,
        priority: 'highest',
        title: 'do backend',
        description: 'we need to complete the entire backend of this app',
        assignee: 'Will',
        reporter: 'Brad',
        site: 'PlumbersStock',
        type: 'Task',
        points: 100,
        status: 'In Progress'
    }
]

export default {
    components: {
        draggable,
        AddTaskForm,
        TaskCard
    },
    props: {
        column: {
            type: Object,
            default: Object
        }
    },
    data: () => ({
        list: tasks.map((task, i) => {
            return { task, order: i + 1 }
        }),
        drag: false
    }),
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost'
            }
        }
    },
    methods: {
        sort() {
            this.list = this.list.sort((a, b) => a.order - b.order)
        },
        log(evt) {
            window.console.log(evt)
        }
    }
}
</script>

<style scoped>
.flip-list-move {
    transition: transform 0.5s;
}
.no-move {
    transition: transform 0s;
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
.list-group {
    min-height: 200px !important;
}
.list-group-item {
    cursor: move;
}
.list-group-item i {
    cursor: pointer;
}
</style>

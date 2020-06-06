<template>
    <v-card max-width="400" class="mx-auto">
        <v-app-bar color="blue-grey">
            <v-btn icon>
                <v-icon>mdi-settings</v-icon>
            </v-btn>
            <v-toolbar-title :column="column" v-text="column.title" />

            <div class="flex-grow-1"></div>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar>

        <v-container class="pa-2" fluid>
            <v-row>
                <v-col>
                    <draggable
                        v-model="column.tasks"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                        @change="(evt) => updateIndexes(evt, column.title)"
                        class="list-group pl-0"
                        group="tasks"
                        tag="ul"
                    >
                        <li
                            v-for="task in column.tasks"
                            :key="task.id"
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
                            />
                            <TaskCard :task="task" />
                        </li>
                    </draggable>
                </v-col>
            </v-row>
            <TaskForm
                :status="column.title"
                :assignee="
                    `${this.$auth.user.firstName} ${this.$auth.user.lastName}`
                "
            />
        </v-container>
    </v-card>
</template>

<script>
import draggable from 'vuedraggable'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'

export default {
    components: {
        draggable,
        TaskForm,
        TaskCard
    },
    props: {
        column: {
            type: Object,
            default: Object
        }
    },
    data: () => ({
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
        updateIndexes(evt, columnTitle) {
            if (evt.added) {
                window.console.log(evt, columnTitle)
                const task = evt.added.element

                const payload = {
                    update: {
                        status: columnTitle,
                        index: evt.added.newIndex
                    },
                    taskId: task._id
                }

                this.$store.dispatch('tasks/updateTask', payload)
            }
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

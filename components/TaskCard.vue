<template>
    <div>
        <v-card
            class="mx-auto"
            max-width="344"
            outlined
            @click="taskView = true"
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4" v-text="task.priority"></div>
                    <v-list-item-title
                        class="headline mb-1"
                        v-text="task.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                        v-text="task.description"
                    ></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>

        <v-dialog v-model="taskView" max-width="600px">
            <v-card outlined @click="taskView = true">
                <v-list-item three-line>
                    <v-list-item-content>
                        <div>
                            <SiteChip :site="task.site" />
                            <TypeChip :type="task.type" />
                            <PriorityChip :priority="task.priority" />
                        </div>
                        <v-list-item-title
                            class="headline mb-1 mt-3"
                            v-text="task.title"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                            class="mb-4"
                            v-text="task.description"
                        ></v-list-item-subtitle>
                        <div>
                            <PointsChip :points="task.points" />
                            <ReporterChip :reporter="task.reporter" />
                        </div>
                    </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                    <EditTaskForm v-bind="task" />
                    <DeleteTaskModal v-bind="task" />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import EditTaskForm from './EditTaskForm'
import DeleteTaskModal from './DeleteTaskModal'
import SiteChip from './chips/SiteChip'
import TypeChip from './chips/TypeChip'
import PriorityChip from './chips/PriorityChip'
import PointsChip from './chips/PointsChip'
import ReporterChip from './chips/ReporterChip'

export default {
    components: {
        EditTaskForm,
        DeleteTaskModal,
        SiteChip,
        TypeChip,
        PriorityChip,
        PointsChip,
        ReporterChip
    },
    props: {
        task: {
            type: Object,
            default: Object
        }
    },
    data: () => ({
        taskView: false
    })
}
</script>

<style scoped>
.v-card--link {
    cursor: move;
}
</style>

<template>
    <div>
        <v-card
            @click="taskView = true"
            class="mx-auto"
            max-width="344"
            outlined
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <div v-text="task.priority" class="overline mb-4"></div>
                    <v-list-item-title
                        v-text="task.title"
                        class="headline mb-1"
                    />
                    <v-list-item-subtitle v-text="task.description" />
                </v-list-item-content>
            </v-list-item>
        </v-card>

        <v-dialog v-model="taskView" max-width="600px">
            <v-card @click="taskView = true" outlined>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div>
                            <SiteChip :site="task.site" />
                            <TypeChip :type="task.type" />
                            <PriorityChip :priority="task.priority" />
                        </div>
                        <v-list-item-title
                            v-text="task.title"
                            class="headline mb-1 mt-3 no-wrap"
                        />
                        <v-list-item-subtitle
                            v-text="task.description"
                            class="mb-4"
                        />
                        <div>
                            <PointsChip :points="task.points" />
                            <ReporterChip :reporter="task.reporter" />
                        </div>
                    </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                    <TaskForm :task-to-edit="task" />
                    <ArchiveTaskModal
                        :taskId="task._id"
                        @archived="taskview = false"
                    />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import TaskForm from './TaskForm'
import ArchiveTaskModal from './ArchiveTaskModal'
import SiteChip from './chips/SiteChip'
import TypeChip from './chips/TypeChip'
import PriorityChip from './chips/PriorityChip'
import PointsChip from './chips/PointsChip'
import ReporterChip from './chips/ReporterChip'

export default {
    components: {
        TaskForm,
        ArchiveTaskModal,
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
.no-wrap {
    white-space: normal;
}
</style>

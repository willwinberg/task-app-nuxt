<template v-slot:default="props">
    <!--            <v-card>-->
    <!--                <v-card-title class="subheading font-weight-bold">{{-->
    <!--                    task.name-->
    <!--                }}</v-card-title>-->

    <!--                <v-divider></v-divider>-->

    <!--                <v-list dense>-->
    <!--                    <v-list-item-->
    <!--                        v-for="(key, index) in filteredKeys"-->
    <!--                        :key="index"-->
    <!--                        :color="-->
    <!--                            sortBy === key ? `blue-grey lighten-4` : `white`-->
    <!--                        "-->
    <!--                    >-->
    <!--                        <v-list-item-content>{{ key }}:</v-list-item-content>-->
    <!--                        <v-list-item-content class="align-end">{{-->
    <!--                            task[key.toLowerCase()]-->
    <!--                        }}</v-list-item-content>-->
    <!--                    </v-list-item>-->
    <!--                </v-list>-->
    <!--            </v-card>-->

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

        <!--                <v-card-actions>-->
        <!--                    <EditTaskForm v-bind="task" />-->
        <!--                    <DeleteTaskModal v-bind="task" />-->
        <!--                </v-card-actions>-->
    </v-card>
</template>

<script>
// import EditTaskForm from './EditTaskForm'
// import DeleteTaskModal from './DeleteTaskModal'
import SiteChip from './chips/SiteChip'
import TypeChip from './chips/TypeChip'
import PriorityChip from './chips/PriorityChip'
import PointsChip from './chips/PointsChip'
import ReporterChip from './chips/ReporterChip'

export default {
    components: {
        // EditTaskForm,
        // DeleteTaskModal,
        SiteChip,
        TypeChip,
        PriorityChip,
        PointsChip,
        ReporterChip
    },
    props: {
        task: Object
    },
    data: () => ({
        keys: [
            'Title',
            'Site',
            'Reporter',
            'Type',
            'Points',
            'Priority',
            'Description',
            'Date'
        ],
        taskView: false
    }),
    computed: {
        filteredKeys() {
            return this.keys.filter((key) => key !== `Title`)
        }
    }
}
</script>

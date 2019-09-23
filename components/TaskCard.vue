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

        <v-dialog v-model="taskView">
            <v-card outlined @click="taskView = true">
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

                <v-card-actions>
                    <EditTaskForm />
                    <v-btn outlined text>delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import EditTaskForm from './EditTaskForm'

export default {
    components: {
        EditTaskForm
    },
    props: {
        task: Object
    },
    data: () => ({
        taskView: false
    })
}
</script>

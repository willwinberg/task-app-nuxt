<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <slot name="button">
                <v-btn v-on="on" outlined text>{{
                    !taskToEdit ? 'Add Task' : 'Edit'
                }}</v-btn>
            </slot>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{
                    !taskToEdit ? 'Add New Task' : 'Edit Task'
                }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="title"
                                :error-messages="titleErrors"
                                :counter="70"
                                @blur="$v.title.$touch()"
                                label="Title*"
                                required
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                v-model="description"
                                :error-messages="descriptionErrors"
                                @blur="$v.description.$touch()"
                                label="Description"
                                height="100"
                            />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="priority"
                                :items="priorityLevels"
                                :error-messages="priorityErrors"
                                @change="$v.priority.$touch()"
                                @blur="$v.priority.$touch()"
                                label="Priority*"
                                required
                            />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="type"
                                :items="types"
                                :error-messages="typeErrors"
                                @change="$v.type.$touch()"
                                @blur="$v.type.$touch()"
                                label="Type*"
                                required
                            />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="status"
                                :items="statusTypes"
                                :error-messages="statusErrors"
                                @change="$v.status.$touch()"
                                @blur="$v.status.$touch()"
                                label="Status*"
                                required
                            />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-slider
                                v-model="points"
                                :error-messages="pointsErrors"
                                @change="$v.points.$touch()"
                                @blur="$v.points.$touch()"
                                class="mt-4"
                                max="100"
                                min="10"
                                step="10"
                                hide-details
                                thumb-label="always"
                                label="Points*"
                                required
                            >
                            </v-slider>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="assignee"
                                :items="Object.values(users)"
                                :error-messages="assigneeErrors"
                                @change="$v.assignee.$touch()"
                                @blur="$v.assignee.$touch()"
                                label="Assignee"
                            />
                        </v-col>
                        <!--                        <v-col cols="12" sm="6">-->
                        <!--                            <v-select-->
                        <!--                                :value="task.reporter"-->
                        <!--                                :items="users"-->
                        <!--                                :error-messages="reporterErrors"-->
                        <!--                                @change="$v.reporter.$touch()"-->
                        <!--                                @blur="$v.reporter.$touch()"-->
                        <!--                                label="Reporter"-->
                        <!--                                required-->
                        <!--                            />-->
                        <!--                        </v-col>-->
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="clear" color="blue darken-1" text>Cancel</v-btn>
                <v-btn @click="handleSubmit" color="blue darken-1" text
                    >Submit</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'

export default {
    mixins: [formValidatorMixin],
    props: {
        taskToEdit: {
            type: Object,
            default: null
        }
    },
    data: () => ({
        title: '',
        description: '',
        priority: '',
        type: '',
        status: '',
        points: 10,
        assignee: '',
        // reporter: '',
        priorityLevels: ['Lowest', 'Low', 'Medium', 'High', 'Highest'],
        types: ['Task', 'Bug', 'Story', 'Epic', 'Theme'],
        statusTypes: ['Task', 'Bug', 'Story', 'Epic', 'Theme'],
        dialog: false,
        users: {},
        error: null,
        submitStatus: null
    }),
    async created() {
        await this.$store.dispatch('user/fetchUsers')
        // await this.makeUserNamesArray()
        this.users = this.$store.state.user.usersNameKey

        // this loads the task to edit data in to form
        if (this.taskToEdit) {
            Object.keys(this.taskToEdit).forEach((key) => {
                if (key in this) {
                    if (key === 'assignee') {
                        this[key] = this.users[this.taskToEdit[key]]
                    } else {
                        this[key] = this.taskToEdit[key]
                    }
                }
            })
        }
    },
    methods: {
        handleSubmit() {
            this.$v.$touch()
            if (this.$v.$error) return

            if (this.taskToEdit) {
                this.handleEditTask()
            } else {
                this.handleAddTask()
            }

            this.dialog = false
        },
        handleAddTask() {
            const route = this.$router.currentRoute.name
            const task = this.task

            if (route === 'index') {
                task.assignee = this.$auth.user._id
            } else if (route === 'browse') {
                task.assignee = null
            }

            this.$store.dispatch('tasks/addTask', task)
        },
        handleEditTask() {
            const payload = {
                update: this.task,
                taskId: this.taskToEdit._id
            }

            this.$store.dispatch('tasks/updateTask', payload)
        },
        makeUserNamesArray() {
            const key = this.$store.state.user.usersNameKey
            this.users = Object.values(key)
        },
        clear() {
            this.$v.$reset()
            this.task = {
                title: '',
                description: '',
                priority: '',
                type: '',
                status: '',
                points: 10,
                assignee: '',
                reporter: ''
            }

            this.dialog = false
        }
    }
}
</script>

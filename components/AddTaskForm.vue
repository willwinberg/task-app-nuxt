<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" outlined text>Add New Task</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="title"
                                :error-messages="titleErrors"
                                :counter="10"
                                @input="$v.title.$touch()"
                                @blur="$v.title.$touch()"
                                label="Title"
                                required
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                v-model="description"
                                :error-messages="descriptionErrors"
                                @input="$v.description.$touch()"
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
                                label="Priority"
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
                                label="Type"
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
                                label="Status"
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
                                label="Points"
                                required
                            >
                            </v-slider>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="assignee"
                                :items="users"
                                :error-messages="assigneeErrors"
                                @change="$v.assignee.$touch()"
                                @blur="$v.assignee.$touch()"
                                label="Assignee"
                                required
                            />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="reporter"
                                :items="users"
                                :error-messages="reporterErrors"
                                @change="$v.reporter.$touch()"
                                @blur="$v.reporter.$touch()"
                                label="Reporter"
                                required
                            />
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="dialog = false" color="blue darken-1" text
                    >Close</v-btn
                >
                <v-btn @click="addTask" color="blue darken-1" text>Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'

export default {
    components: {},
    mixins: [formValidatorMixin],
    props: {
        formTitle: {
            type: String,
            default: 'Add Task'
        }
    },
    data: () => ({
        dialog: false,
        title: '',
        description: '',
        checkbox: '',
        priority: '',
        priorityLevels: ['Lowest', 'Low', 'Medium', 'High', 'Highest'],
        type: '',
        types: ['Task', 'Bug', 'Story', 'Epic', 'Theme'],
        status: '',
        statusTypes: ['Task', 'Bug', 'Story', 'Epic', 'Theme'],
        points: 10,
        assignee: '',
        reporter: '',
        users: [],
        error: null,
        submitStatus: null
    }),
    async created() {
        await this.$store.dispatch('user/fetchUsers')
        await this.getUserNames()
    },
    // computed: {
    //     redirect() {
    //         return (
    //             this.$route.query.redirect &&
    //             decodeURIComponent(this.$route.query.redirect)
    //         )
    //     }
    // },
    methods: {
        addTask(task) {
            this.$store.dispatch('tasks/addTask', task)
            this.dialog = false
        },
        getUserNames(id) {
            const key = this.$store.state.user.usersNameKey
            this.users = Object.values(key)
        },
        clear() {
            // const response = this.$store.dispatch('user/fetchUsers')
            this.$v.$reset()
            this.name = ''
            this.email = ''
            this.select = null
            this.checkbox = false
            this.dialog = false
        }
    }
}
</script>

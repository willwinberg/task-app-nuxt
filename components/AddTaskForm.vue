<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn outlined text v-on="on">Add New Task</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Add Task</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="title"
                                :error-messages="titleErrors"
                                :counter="10"
                                label="Title"
                                required
                                @input="$v.title.$touch()"
                                @blur="$v.title.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="description"
                                :error-messages="descriptionErrors"
                                label="Description"
                                @input="$v.description.$touch()"
                                @blur="$v.description.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="priority"
                                :items="priorityLevels"
                                :error-messages="selectErrors"
                                label="Priority"
                                required
                                @change="$v.select.$touch()"
                                @blur="$v.select.$touch()"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-checkbox
                                v-model="checkbox"
                                :error-messages="checkboxErrors"
                                label="Do you agree?"
                                required
                                @change="$v.checkbox.$touch()"
                                @blur="$v.checkbox.$touch()"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialog = false"
                    >Close</v-btn
                >
                <v-btn color="blue darken-1" text @click="addTask">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'

export default {
    // middleware: ['auth'],
    components: {},
    mixins: [formValidatorMixin],
    data: () => ({
        dialog: false,
        title: '',
        description: '',
        checkbox: '',
        priority: '',
        priorityLevels: ['urgent', 'never'],
        error: null,
        submitStatus: null
    }),
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

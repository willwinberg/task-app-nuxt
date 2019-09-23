<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn outlined text v-on="on">Edit</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Edit Task</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="title"
                                :error-messages="titleErrors"
                                label="Title*"
                                required
                                name="title"
                                @input="$v.title.$touch()"
                                @blur="$v.title.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                v-model="description"
                                :error-messages="descriptionErrors"
                                label="Description"
                                required
                                name="description"
                                autocomplete="off"
                                @input="$v.description.$touch()"
                                @blur="$v.description.$touch()"
                            >
                                <template v-slot:label>
                                    <div>
                                        Description
                                        <small>(optional)</small>
                                    </div>
                                </template>
                            </v-textarea>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                :items="[
                                    'In Progress',
                                    'To Do',
                                    'Backlog',
                                    'Done'
                                ]"
                                label="Status*"
                                required
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                :items="['bill', 'gill', 'will']"
                                label="Assignee*"
                                multiple
                            ></v-autocomplete>
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
                <v-btn color="blue darken-1" text @click="dialog = false"
                    >Save</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'

export default {
    mixins: [formValidatorMixin],
    data: () => ({
        dialog: false,
        title: '',
        description: ''
    }),
    methods: {
        getUsersArray() {
            return ['bill', 'gill']
        }
    }
}
</script>

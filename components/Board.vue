<template>
    <v-row>
        <v-col v-for="key in Object.keys(columns)" :key="key">
            <Column :column="columns[key]" />
        </v-col>
        <!--        <v-col key="add-new-column">-->
        <!--            <v-card max-width="400" class="mx-auto">-->
        <!--                <v-app-bar color="blue-grey">-->
        <!--                    <v-btn icon>-->
        <!--                        <v-icon>mdi-plus</v-icon>-->
        <!--                    </v-btn>-->
        <!--                    <v-text-field-->
        <!--                        v-model="columnName"-->
        <!--                        :error-messages="columnNameErrors"-->
        <!--                        @blur="$v.columnName.$touch()"-->
        <!--                        class="mt-4 color-white"-->
        <!--                        placeholder="Add New Column"-->
        <!--                        required-->
        <!--                    />-->
        <!--                </v-app-bar>-->
        <!--            </v-card>-->
        <!--        </v-col>-->
    </v-row>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'
import Column from './Column'

export default {
    components: {
        Column
    },
    mixins: [formValidatorMixin],
    data: () => ({
        columns: {
            'To Do': {
                key: 0,
                title: 'To Do',
                tasks: []
            },
            'In Progress': {
                key: 1,
                title: 'In Progress',
                tasks: []
            },
            Done: {
                key: 2,
                title: 'Done',
                tasks: []
            },
            Backlog: {
                key: 3,
                title: 'Backlog',
                tasks: []
            }
        }
        // columnName: ''
    }),
    computed: {
        allMyTask() {
            return this.$store.getters['tasks/getMyTasks']
        }
    },
    // updated() {
    //     this.loadColumnsWithTasks()
    // },
    // watch: {
    //     /* eslint-disable */
    //     allMyTasks: function(tasks) {
    //         this.loadColumnsWithTasks()
    //         alert('yo')
    //     }
    // },
    async created() {
        await this.$store.dispatch('tasks/fetchTasks')
        await this.$store.dispatch('user/fetchUsers')
        this.loadColumnsWithTasks()
    },
    methods: {
        loadColumnsWithTasks() {
            this.allMyTask.forEach((task) => {
                this.columns[task.status].tasks.push(task)
            })
        }
    }
}
</script>

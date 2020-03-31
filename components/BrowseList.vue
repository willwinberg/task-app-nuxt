<template>
    <v-card>
        <v-toolbar color="blue-grey">
            <v-toolbar-title>
                Unassigned Tasks
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                class="mr-4"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <AddTaskForm />
        </v-toolbar>
        <v-data-table
            :loading="loading"
            :headers="headers"
            :items="tasks"
            :search="search"
            :sort-by="['site', 'priority']"
            :sort-desc="[false, true]"
            :expanded.sync="expanded"
            item-key="index"
            loading-text="Loading tasks... Please wait"
            multi-sort
            single-expanded
            show-expand
            class="elevation-1"
        >
            <template v-slot:item.title="{ item }">
                <div class="limit-characters">{{ item.title }}</div>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" class="pb-3 wrap-hack">
                    <p class="description">{{ item.description }}</p>
                    <EditTaskForm v-bind="item" />
                    <DeleteTaskModal v-bind="item" />
                </td>
            </template>
            <template v-slot:item.reporter="{ item }">
                <div>{{ getReporterName(item.reporter) || 'Unknown' }}</div>
            </template>
            <template v-slot:item.dateAdded="{ item }">
                <div>{{ formattedDate(item.dateAdded) || 'N/A' }}</div>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon @click="takeTask(item)" right>
                    mdi-plus
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'
import AddTaskForm from './AddTaskForm'
import EditTaskForm from './EditTaskForm'
import DeleteTaskModal from './DeleteTaskModal'

export default {
    components: {
        AddTaskForm,
        EditTaskForm,
        DeleteTaskModal
    },
    mixins: [formValidatorMixin],
    data() {
        return {
            search: '',
            expanded: [],
            singleExpand: true,
            loading: true,
            headers: [
                { text: 'Title', value: 'title' },
                { text: 'Site', value: 'site' },
                { text: 'Priority', value: 'priority' },
                { text: 'Type', value: 'type' },
                { text: 'Reporter', value: 'reporter' },
                { text: 'Date', value: 'dateAdded', width: '120px' },
                { text: 'Take', value: 'action', sortable: false }
                // add points
            ],
            tasks: [],
            users: []
        }
    },
    async created() {
        await this.$store.dispatch('tasks/fetchUnassignedTasks')
        await this.$store.dispatch('user/fetchUsers')
        this.loadListWithTasks()
        this.loading = false
    },
    methods: {
        loadListWithTasks() {
            this.tasks = this.$store.state.tasks.unassignedTasks
        },
        // TODO: clean data to enforce date objects
        formattedDate(date) {
            if (date === null) return 'N/A'
            if (typeof date === 'string') {
                return date.split('T')[0]
            } else if (typeof date === 'object') {
                return date.getMonth()
            } else {
                return 'N/A'
            }
        },
        async takeTask(task) {
            await this.$store.dispatch('tasks/takeTask', task)
        },
        getReporterName(id) {
            return this.$store.state.user.usersNameKey[id]
        }
    }
}
</script>

<style>
.limit-characters {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}
.wrap-hack {
    max-width: 1px;
}
.description {
    overflow-wrap: break-word;
}
</style>

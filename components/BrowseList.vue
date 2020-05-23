<template>
    <v-card>
        <v-toolbar color="blue-grey">
            <v-toolbar-title>
                Unassigned Tasks
            </v-toolbar-title>
            <v-spacer />
            <v-text-field
                v-model="search"
                class="mr-4"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            />
            <TaskForm />
        </v-toolbar>
        <v-data-table
            :loading="loading"
            :headers="headers"
            :items="tasks"
            :search="search"
            :sort-by="['site', 'priority']"
            :sort-desc="[false, true]"
            :expanded.sync="expanded"
            item-key="_id"
            loading-text="Loading tasks... Please wait"
            multi-sort
            single-expand
            show-expand
            class="elevation-1"
        >
            <template v-slot:item.title="{ item }">
                <div class="limit-characters">{{ item.title }}</div>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" class="pb-3 wrap-hack">
                    <p class="description">{{ item.description }}</p>
                    <TaskForm :task-to-edit="item" />
                    <DeleteTaskModal :task-id="item._id" />
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
import TaskForm from './TaskForm'
import DeleteTaskModal from './DeleteTaskModal'

export default {
    components: {
        TaskForm,
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
            return this.$store.state.user.usersNameAndIdKey[id]
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

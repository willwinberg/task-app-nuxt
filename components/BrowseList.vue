<script src="../mixins/formValidatorMixin.js"></script>
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
            <template v-slot:item.date="{ item }">
                <div>{{ formattedDate(item.date) }}</div>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon @click="takeItem(item)" right>
                    mdi-plus
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import AddTaskForm from './AddTaskForm'
import EditTaskForm from './EditTaskForm'
import DeleteTaskModal from './DeleteTaskModal'
export default {
    components: {
        AddTaskForm,
        EditTaskForm,
        DeleteTaskModal
    },
    data() {
        return {
            search: '',
            expanded: [],
            singleExpand: false,
            loading: false,
            headers: [
                { text: 'Title', value: 'title' },
                { text: 'Site', value: 'site' },
                { text: 'Priority', value: 'priority' },
                { text: 'Type', value: 'type' },
                { text: 'Reporter', value: 'reporter' },
                { text: 'Date', value: 'date', width: '120px' },
                { text: 'Take', value: 'action', sortable: false }
            ],
            tasks: [
                {
                    _id: '5d9c018ba130ecebd9bacfa5',
                    index: 0,
                    points: 94,
                    priority: 'High',
                    site: 'PlumberStock',
                    type: 'Epic',
                    asignee: '5d9c018bf52557d9674caee0',
                    reporter: 'Leah',
                    title:
                        'incididunt incididunt pariatur culpa non incididunt incididunt pariatur culpa non',
                    description:
                        'Dolore quis reprehenderit reprehenderit ex eiusmod exercitation exercitation sunt exercitation anim. Irure nisi sit commodo esse. Culpa sint veniam tempor qui pariatur velit nostrud. Consequat cupidatat incididunt deserunt laboris labore id qui cillum velit adipisicing. Incididunt nisi occaecat et anim laboris ea sit adipisicing.',
                    date: 'Sunday, June 11, 2017 4:35 PM',
                    completeDate: 'Monday, July 7, 2014 2:15 AM'
                },
                {
                    _id: '5d9c018b57ab47f24cc9c990',
                    index: 1,
                    points: 81,
                    priority: 'Low',
                    site: 'SWPlumbing',
                    type: 'Epic',
                    asignee: '5d9c018bd5ecc793d3d8b357',
                    reporter: 'Cathleen',
                    title: 'magna incididunt Lorem ut labore',
                    description:
                        'Dolore commodo incididunt enim cupidatat veniam occaecat incididunt excepteur esse cillum nulla. Minim pariatur id anim sint dolor ipsum excepteur. Esse ipsum velit nisi cupidatat dolor deserunt do dolore exercitation elit. Occaecat consequat dolore magna dolore quis occaecat quis in nostrud commodo. Labore excepteur nisi mollit velit. Veniam quis velit non qui laborum cupidatat esse duis aliqua nostrud proident proident minim duis.',
                    date: 'Sunday, November 6, 2016 3:21 PM',
                    completeDate: 'Tuesday, June 25, 2019 1:38 AM'
                },
                {
                    _id: '5d9c018b7c4b2414f31fd524',
                    index: 2,
                    points: 83,
                    priority: 'Lowest',
                    site: 'Adams',
                    type: 'Epic',
                    asignee: '5d9c018bbb7112edad6b906e',
                    reporter: 'Tabitha',
                    title: 'cillum fugiat aute officia sint',
                    description:
                        'Ipsum adipisicing pariatur enim ut non veniam est. In esse tempor pariatur occaecat eiusmod. Culpa ut quis dolore Lorem laboris culpa ipsum.',
                    date: 'Sunday, April 3, 2016 9:27 AM',
                    completeDate: 'Wednesday, January 21, 2015 3:40 PM'
                },
                {
                    _id: '5d9c018b19227a0d12e51337',
                    index: 3,
                    points: 11,
                    priority: 'Lowest',
                    site: 'SWPlumbing',
                    type: 'Bug',
                    asignee: '5d9c018b9d34d23ec93bf9ed',
                    reporter: 'Betty',
                    title: 'tempor deserunt sit velit mollit',
                    description:
                        'Commodo aliquip nisi culpa esse ipsum eiusmod deserunt minim nostrud dolor nostrud. Sit occaecat reprehenderit voluptate est laborum cillum id sit. Dolor anim do et commodo veniam veniam ullamco proident adipisicing Lorem voluptate tempor laboris. Esse magna exercitation id deserunt ipsum pariatur quis pariatur consectetur do. Enim adipisicing deserunt ex cillum duis ut. Esse eu exercitation ipsum velit. Amet irure aliquip excepteur pariatur nostrud aliqua sit non sit magna ut do officia.',
                    date: 'Saturday, August 18, 2018 8:55 AM',
                    completeDate: 'Sunday, June 19, 2016 7:39 PM'
                },
                {
                    _id: '5d9c018b18522dcc21791944',
                    index: 4,
                    points: 54,
                    priority: 'Medium',
                    site: 'PlumberStock',
                    type: 'Theme',
                    asignee: '5d9c018ba9eb150abea03169',
                    reporter: 'Nettie',
                    title: 'est tempor sunt eu dolore',
                    description:
                        'Duis aliquip tempor qui est irure. Proident anim eu sint esse laborum in aute culpa in dolore laborum. Ea in mollit laborum commodo. Culpa in cupidatat dolore nisi excepteur consectetur do sunt ex consequat incididunt anim. Qui laborum eu excepteur dolore irure voluptate cupidatat excepteur tempor eiusmod. Enim ea ea elit velit ex id culpa adipisicing. Anim fugiat eu ad sit quis cillum.',
                    date: 'Sunday, April 21, 2019 11:17 AM',
                    completeDate: 'Saturday, September 24, 2016 3:36 PM'
                },
                {
                    _id: '5d9c018b64410c00f0bdfc48',
                    index: 5,
                    points: 97,
                    priority: 'Low',
                    site: 'PlumberStock',
                    type: 'Theme',
                    asignee: '5d9c018b4d639f5906b319c0',
                    reporter: 'Craig',
                    title: 'nisi et officia in nisi',
                    description:
                        'Consectetur laborum ullamco sunt consectetur adipisicing esse cillum. Et ea elit laborum duis qui in nisi laborum. Deserunt Lorem fugiat do labore reprehenderit ut in consectetur id ut cillum in. Eiusmod eu id consequat commodo commodo.',
                    date: 'Tuesday, March 27, 2018 4:37 PM',
                    completeDate: 'Monday, January 22, 2018 8:11 AM'
                },
                {
                    _id: '5d9c018b917dccaaa30f2555',
                    index: 6,
                    points: 49,
                    priority: 'Highest',
                    site: 'Adams',
                    type: 'Story',
                    asignee: '5d9c018bffaa8a0034a31d08',
                    reporter: 'Jewel',
                    title: 'do eu nulla Lorem voluptate',
                    description:
                        'Aliquip consequat nostrud ut consectetur veniam ex deserunt duis do sunt elit velit commodo cillum. In minim consectetur adipisicing proident reprehenderit elit irure est. Et sunt officia labore eiusmod id dolor ea aliqua elit aliquip deserunt anim mollit excepteur. Voluptate nisi minim quis ullamco reprehenderit. Ut nostrud voluptate ullamco enim laboris reprehenderit esse consectetur consequat elit aliqua aliqua aliquip. Ea dolor irure ad culpa aute fugiat amet.',
                    date: 'Wednesday, September 3, 2014 9:11 AM',
                    completeDate: 'Wednesday, September 21, 2016 12:58 PM'
                },
                {
                    _id: '5d9c018b8d883d34cc11f015',
                    index: 7,
                    points: 11,
                    priority: 'Lowest',
                    site: 'PlumberStock',
                    type: 'Bug',
                    asignee: '5d9c018b356c76ed1d820795',
                    reporter: 'Rosie',
                    title: 'labore dolore irure consectetur ea',
                    description:
                        'Incididunt incididunt dolor culpa enim aliqua incididunt reprehenderit ipsum irure esse. Reprehenderit ad ullamco quis laborum cillum aliqua duis consequat incididunt et enim. Lorem deserunt enim enim enim Lorem eu consectetur. Dolore culpa tempor amet pariatur excepteur culpa nisi veniam amet ipsum mollit deserunt et aute. Sit et laborum reprehenderit irure proident voluptate dolor amet Lorem. Incididunt aute esse culpa ad id consequat qui sit laborum enim laboris reprehenderit. Amet commodo cupidatat elit irure fugiat in voluptate reprehenderit commodo est.',
                    date: 'Monday, June 17, 2019 3:56 AM',
                    completeDate: 'Saturday, July 6, 2019 10:01 PM'
                },
                {
                    _id: '5d9c018b403ad51a4a0131d0',
                    index: 8,
                    points: 74,
                    priority: 'Medium',
                    site: 'SWPlumbing',
                    type: 'Theme',
                    asignee: '5d9c018bfc35065d576071da',
                    reporter: 'Ortega',
                    title: 'officia ullamco elit non do',
                    description:
                        'Officia ad deserunt proident excepteur eiusmod ea ut magna culpa laborum. Nisi aliquip elit excepteur dolor fugiat. Eiusmod nostrud do anim aliquip do laborum ut amet proident dolor dolore. Incididunt excepteur ipsum cupidatat eu. Velit reprehenderit excepteur cupidatat esse proident ipsum do qui consectetur exercitation magna deserunt.',
                    date: 'Tuesday, September 10, 2019 3:14 AM',
                    completeDate: 'Tuesday, April 15, 2014 10:04 PM'
                }
            ]
        }
    },
    methods: {
        // TODO: change this function after all dates are javascript date objects
        formattedDate(dateStr) {
            const arr = dateStr.split(' ')
            return `${arr[1].substring(0, 3)}, ${arr[2]} ${arr[3]}`
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

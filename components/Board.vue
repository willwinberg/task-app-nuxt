<template>
    <v-card max-width="400" class="mx-auto">
        <v-system-bar color="pink darken-2"></v-system-bar>

        <v-app-bar dark color="pink">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>My Music</v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar>

        <v-container class="pa-2" fluid>
            <v-row>
                <v-col>
                    <v-card color="#385F73" dark>
                        <v-card-text class="white--text">
                            <div class="headline mb-2">Unlimited music now</div>
                            Listen to your favorite artists and albums whenever
                            and wherever, online and offline.
                        </v-card-text>

                        <v-card-actions>
                            <v-btn text>Listen Now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col v-for="(item, i) in items" :key="i">
                    <task :task="task" />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import Task from './Task'

export default {
    components: {
        Task
    },
    data: () => ({
        items: [
            {
                color: '#1F7087',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                title: 'Supermodel',
                artist: 'Foster the People'
            },
            {
                color: '#952175',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'Halcyon Days',
                artist: 'Ellie Goulding'
            }
        ]
    })
}
</script>

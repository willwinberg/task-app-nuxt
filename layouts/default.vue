<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list>
                <v-list-item @click="goHome">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>My Tasks</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="goUnassigned">
                    <v-list-item-action>
                        <v-icon>mdi-magnify-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Unassigned Tasks</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="goAll">
                    <v-list-item-action>
                        <v-icon>mdi-magnify-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Others' Tasks</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="goSettings">
                    <v-list-item-action>
                        <v-icon>mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title class="font-weight-bold">{{
                title
            }}</v-toolbar-title>
            <v-spacer />
            <AvatarMenu v-if="$auth.loggedIn" />
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <nuxt />
            </v-container>
        </v-main>
        <v-footer app>
            <span>&copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script>
import AvatarMenu from '../components/AvatarMenu'
export default {
    components: {
        AvatarMenu
    },
    data: () => ({
        drawer: null,
        title: 'Gogrello'
    }),
    methods: {
        goHome() {
            this.$router.push({
                path: '/'
            })
        },
        goSettings() {
            this.$router.push({
                path: '/settings'
            })
        },
        goUnassigned() {
            this.$router.push({
                path: '/unassigned'
            })
        },
        goAll() {
            this.$router.push({
                path: '/all'
            })
        }
    }
}
</script>

<style>
a,
u {
    text-decoration: none;
}
ol,
ul,
li {
    list-style: none;
}
</style>

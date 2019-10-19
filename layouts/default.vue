<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list>
                <nuxt-link to="/">
                    <v-list-item @click="goHome">
                        <v-list-item-action>
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Dashboard</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </nuxt-link>
                <nuxt-link to="/browse">
                    <v-list-item @click="goBrowse">
                        <v-list-item-action>
                            <v-icon>mdi-magnify-plus</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Browse Tasks</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </nuxt-link>
                <nuxt-link to="/settings">
                    <v-list-item @click="goSettings">
                        <v-list-item-action>
                            <v-icon>mdi-settings</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Settings</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </nuxt-link>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <ThemeSwitcher />
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <nuxt />
            </v-container>
        </v-content>
        <v-footer app>
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
import ThemeSwitcher from '../components/ThemeSwitcher'
export default {
    components: {
        ThemeSwitcher
    },
    data: () => ({
        drawer: null,
        title: 'Gogrello'
    }),
    methods: {
        goHome() {},
        goSettings() {},
        goBrowse() {}
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

<template>
    <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab>
                <v-avatar>
                    <img
                        v-if="loggedInUser"
                        src="https://avatars3.githubusercontent.com/u/29470415?s=460&v=4"
                        alt="John"
                    />
                    <span
                        v-else
                        v-text="loggedInUser || 'WW'"
                        class="headline"
                    ></span>
                </v-avatar>
            </v-btn>
        </template>
        <v-list>
            <v-list-item @click="goToProfile">
                <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['loggedInUser'])
    },
    methods: {
        async logout() {
            await this.$auth.logout()
        },
        goToProfile() {
            this.$router.push({
                path: '/settings'
            })
        }
    }
}
</script>

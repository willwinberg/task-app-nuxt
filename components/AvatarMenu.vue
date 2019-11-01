<template>
    <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
            <v-btn fab v-on="on">
                <v-avatar>
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    />
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
export default {
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

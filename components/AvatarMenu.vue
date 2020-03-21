<template>
    <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab>
                <v-avatar>
                    <img
                        v-if="$auth.user.avatar"
                        :src="$auth.user.avatar"
                        :alt="$auth.user.name"
                    />
                    <span
                        v-else
                        v-text="$auth.user.initials || 'WW'"
                        class="headline"
                    />
                </v-avatar>
            </v-btn>
        </template>
        <v-list>
            <v-list-item @click="$router.push('/settings')">
                <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$auth.logout">
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

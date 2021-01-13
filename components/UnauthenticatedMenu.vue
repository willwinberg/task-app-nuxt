<template>
    <v-toolbar-items>
        <v-btn @click="goLogin" text>Login</v-btn>
        <v-btn @click="goRegister" text>Register</v-btn>
    </v-toolbar-items>
</template>

<script>
export default {
    methods: {
        goLogin() {
            this.$router.push({
                path: '/login'
            })
        },
        goRegister() {
            this.$router.push({
                path: '/register'
            })
        }
    }
}
</script>

<template>
    <v-toolbar-items>
        <v-btn text @click="goLogin">Login</v-btn>
        <v-btn text @click="goRegister">Register</v-btn>
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

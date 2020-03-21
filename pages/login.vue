<template>
    <v-col cols="12" sm="6" md="4">
        <v-alert v-if="$auth.$state.redirect" type="error"
            >You have to login before accessing to
            {{ $auth.$state.redirect }}</v-alert
        >
        <v-alert v-if="$auth.loggedIn" type="success"
            >You already logged in yo</v-alert
        >
        <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form
                    @keydown.enter="login"
                    @submit.prevent="login"
                    method="post"
                >
                    <v-text-field
                        v-model.trim="email"
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        label="Email"
                        required
                        name="email"
                        prepend-icon="mdi-login"
                        autocomplete="off"
                        value="will@bill.org"
                    />

                    <v-text-field
                        v-model.trim="password"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        label="Password"
                        required
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        autocomplete="off"
                        value="tester"
                    />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click.prevent="login" color="primary" type="submit"
                    >Login</v-btn
                >
                <v-btn @click="clear">Clear</v-btn>
            </v-card-actions>
            <p class="text-center subtitle-1 pt-2 pb-2">
                Don't have an account yet?
                <nuxt-link to="/register"> Register!</nuxt-link>
            </p>
        </v-card>
    </v-col>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'

export default {
    layout: 'unauthenticated',
    components: {},
    mixins: [formValidatorMixin],
    data: () => ({
        drawer: null,
        email: 'wtpwinberg@gmail.oom',
        password: 'ambros1a'
    }),
    validations: formValidatorMixin.validations,
    computed: {
        redirect() {
            return (
                this.$route.query.redirect &&
                decodeURIComponent(this.$route.query.redirect)
            )
        }
    },
    methods: {
        async login() {
            this.error = null
            await formValidatorMixin.validate
            this.$v.$touch()

            if (!this.$v.invalid) {
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    })
                    this.showLoginSuccess()
                } catch (e) {
                    this.showLoginError({ message: e.message })
                }
            }
        },
        clear() {
            // const response = this.$store.dispatch('user/fetchUsers')
            this.$v.$reset()
            this.name = ''
            this.email = ''
            this.select = null
            this.checkbox = false
        }
    },
    notifications: {
        showLoginError: {
            title: 'Login Failed',
            message: 'Failed to authenticate',
            type: 'error'
        },
        showLoginSuccess: {
            title: 'Login Success',
            message: 'Welcome back!',
            type: 'success'
        }
    }
}
</script>

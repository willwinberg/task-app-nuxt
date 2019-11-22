<template>
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <form @keydown.enter="register" @submit.prevent="register">
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
                ></v-text-field>

                <v-text-field
                    v-model.trim="emailConfirm"
                    :error-messages="emailConfirmErrors"
                    @input="$v.emailConfirm.$touch()"
                    @blur="$v.emailConfirm.$touch()"
                    label="Confirm Email"
                    required
                    name="email-confirm"
                    prepend-icon="mdi-login"
                    autocomplete="off"
                ></v-text-field>

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
                ></v-text-field>
                <v-text-field
                    v-model.trim="passwordConfirm"
                    :error-messages="passwordConfirmErrors"
                    @input="$v.passwordConfirm.$touch()"
                    @blur="$v.passwordConfirm.$touch()"
                    label="Confirm Password"
                    required
                    name="password-confirm"
                    prepend-icon="mdi-lock"
                    type="password"
                    autocomplete="off"
                ></v-text-field>
            </form>
        </v-card-text>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="register" color="primary" type="submit"
                >Register</v-btn
            >
            <v-btn @click="clear">Clear</v-btn>
        </v-card-actions>
        <p class="text-center subtitle-1 pt-2 pb-2">
            Already have an account?
            <nuxt-link to="/login"> Login!</nuxt-link>
        </p>
    </v-card>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'

export default {
    layout: 'unauthenticated',
    auth: false,
    components: {},
    mixins: [formValidatorMixin],
    data: () => ({
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        error: null,
        submitStatus: null,
        drawer: null
    }),
    // asyncData: async (context) => {
    //     try {
    //         return await context.$axios.get('http://localhost:8000/foo').data
    //     } catch {
    //         context.error({
    //             message: 'ajax problem...'
    //         })
    //     }
    // },
    methods: {
        async register() {
            this.error = null
            // formValidatorMixin.validate()
            this.$v.$touch()

            if (this.$v.invalid) {
                this.submitStatus = 'ERROR'
            } else {
                this.submitStatus = 'PENDING'
                const data = {
                    email: this.email,
                    password: this.password
                }
                await this.$store.dispatch('user/register', data).catch((e) => {
                    this.error = e.response.data.message + ''
                })
                if (!this.error) {
                    this.$auth.loginWith('local', {
                        data: {
                            email: 'will@bill.org',
                            password: 'testerer'
                        }
                    })
                }
                // .then(() => this.$toast.success('User set!'))
            }
        },
        clear() {
            this.$v.$reset()
            this.email = ''
            this.emailConfirm = ''
            this.password = ''
            this.passwordConfirm = ''
        }
    }
}
</script>

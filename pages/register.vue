<template>
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <form @keydown.enter="register" @submit.prevent="test">
                <v-text-field
                    v-model.trim="email"
                    :error-messages="emailErrors"
                    label="Email"
                    required
                    name="email"
                    prepend-icon="mdi-login"
                    autocomplete="off"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                ></v-text-field>

                <v-text-field
                    v-model.trim="emailConfirm"
                    :error-messages="emailConfirmErrors"
                    label="Confirm Email"
                    required
                    name="email-confirm"
                    prepend-icon="mdi-login"
                    autocomplete="off"
                    @input="$v.emailConfirm.$touch()"
                    @blur="$v.emailConfirm.$touch()"
                ></v-text-field>

                <v-text-field
                    v-model.trim="password"
                    :error-messages="passwordErrors"
                    label="Password"
                    required
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    autocomplete="off"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model.trim="passwordConfirm"
                    :error-messages="passwordConfirmErrors"
                    label="Confirm Password"
                    required
                    name="password-confirm"
                    prepend-icon="mdi-lock"
                    type="password"
                    autocomplete="off"
                    @input="$v.passwordConfirm.$touch()"
                    @blur="$v.passwordConfirm.$touch()"
                ></v-text-field>
            </form>
        </v-card-text>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" type="submit" @click="login">Register</v-btn>
            <v-btn @click="clear">Clear</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'

export default {
    layout: 'unauthenticated',
    // middleware: ['auth'],
    components: {},
    mixins: [formValidatorMixin],
    data: () => ({
        drawer: null,
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        error: null,
        submitStatus: null
    }),
    asyncData: async (context) => {
        try {
            return await context.$axios.get('http://localhost:8000/foo').data
        } catch {
            context.error({
                message: 'ajax problem...'
            })
        }
    },
    methods: {
        register() {
            this.error = null
            // formValidatorMixin.validate()
            this.$v.$touch()

            if (this.$v.invalid) {
                this.submitStatus = 'ERROR'
            } else {
                this.submitStatus = 'PENDING'
                // api register
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

<template>
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form @keydown.enter="login" @submit.prevent="test">
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
            </v-form>
        </v-card-text>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" type="submit" @click="login">Login</v-btn>
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
        password: '',
        error: null,
        submitStatus: null
    }),
    // validations: formValidatorMixin.validations,
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
            await formValidatorMixin.validate()
            this.$v.$touch()

            if (this.$v.invalid) {
                this.submitStatus = 'ERROR'
            } else {
                this.submitStatus = 'PENDING'
                return this.$auth
                    .loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    })
                    .catch((e) => {
                        this.error = e + ''
                    })
            }
        },
        clear() {
            this.$v.$reset()
            this.name = ''
            this.email = ''
            this.select = null
            this.checkbox = false
        },
        async send() {
            console.log('send called')
            await this.$axios({
                method: 'get',
                url: '/your-route'
            })
                .then((res) => {
                    console.log('in then')
                    console.log(res.data)
                    this.onReset()
                })
                .catch((e) => {
                    console.log('in err', e.response)

                    this.error = true
                    this.success = false
                })
            this.waiting = false
        }
    }
}
</script>

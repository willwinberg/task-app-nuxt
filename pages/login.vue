<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-card-text>
      <v-form @keydown.enter="login" @submit.prevent="test">
        <v-text-field
          ref="email"
          v-model.trim="$v.email.$model"
          :status="$v.email.$error ? 'error' : null"
          label="Email"
          name="email"
          prepend-icon="mdi-login"
          type="email"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <ul v-if="$v.email.$error">
          <li v-if="!$v.email.required">
            This field is required.
          </li>
          <li v-if="!$v.email.email">
            Must be valid email.
          </li>
        </ul>

        <v-text-field
          id="password"
          ref="password"
          v-model="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="primary" type="submit" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import formValidatorMixin from '@@/mixins/formValidatorMixin'

export default {
  name: 'LoginForm',
  layout: 'unauthenticated',

  // middleware: ['auth'],
  components: {},
  mixins: [formValidatorMixin],
  data: () => ({
    drawer: null,
    email: '',
    password: '',
    error: null
  }),
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    }
  },
  methods: {
    // needs to be async?
    login() {
      this.error = null
      this.$v.$touch()

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
  }
}
</script>

<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-card-text>
      <v-form @keydown.enter="login">
        <v-text-field
          label="Username"
          name="username"
          prepend-icon="mdi-person"
          type="text"
          ref="username"
          v-model="username"
        ></v-text-field>

        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          ref="username"
          v-model="username"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<!--  <div>-->
<!--    <h2 class="text-center">Login</h2>-->
<!--    <hr />-->
<!--    <b-alert v-if="error" show variant="danger">{{ error + '' }}</b-alert>-->
<!--    <b-alert v-if="$auth.$state.redirect" show>-->
<!--      You have to login before accessing to-->
<!--      <strong>{{ $auth.$state.redirect }}</strong>-->
<!--    </b-alert>-->
<!--    <b-row align-h="center" align-v="center">-->
<!--      <b-col md="4">-->
<!--        <b-card bg-variant="light">-->
<!--          <busy-overlay />-->
<!--          <form @keydown.enter="login">-->
<!--            <b-form-group label="Username">-->
<!--              <b-input-->
<!--                ref="username"-->
<!--                v-model="username"-->
<!--                placeholder="anything"-->
<!--              />-->
<!--            </b-form-group>-->

<!--            <b-form-group label="Password">-->
<!--              <b-input v-model="password" type="password" placeholder="123" />-->
<!--            </b-form-group>-->

<!--            <div class="text-center">-->
<!--              <b-btn variant="primary" block @click="login">Login</b-btn>-->
<!--            </div>-->
<!--          </form>-->
<!--        </b-card>-->
<!--      </b-col>-->
<!--      <b-col md="1">-->
<!--        <div class="text-center"><b-badge pill>OR</b-badge></div>-->
<!--      </b-col>-->
<!--      <b-col md="4" class="text-center pt-4">-->
<!--        <b-card title="Social Login" bg-variant="light">-->
<!--          <div v-for="s in strategies" :key="s.key" class="mb-2">-->
<!--            <b-btn-->
<!--              block-->
<!--              :style="{ background: s.color }"-->
<!--              class="login-button"-->
<!--              @click="$auth.loginWith(s.key)"-->
<!--              >Login with {{ s.name }}</b-btn-->
<!--            >-->
<!--          </div>-->
<!--        </b-card>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--  </div>-->

<script>
export default {
  layout: 'unauthenticated',
  // middleware: ['auth'],
  components: {},
  data: () => ({
    drawer: null,
    username: '',
    password: '123',
    error: null
  }),
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    }
  },
  methods: {
    // this is prolly the async that destroyed mn everything. lol "prolly" async
    login() {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
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

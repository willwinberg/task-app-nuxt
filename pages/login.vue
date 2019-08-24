<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-person"
                    type="text"
                  ></v-text-field>
                  <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                    <v-icon>mdi-menu</v-icon>
                  </v-btn>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<!--<template>-->
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
<!--</template>-->

<script>
export default {
  middleware: ['auth'],
  components: {},
  data: () => ({
    drawer: null,
    username: '',
    password: '123',
    error: null
  }),
  computed: {
    strategies: () => [
      { key: 'auth0', name: 'Auth0', color: '#ec5425' },
      { key: 'google', name: 'Google', color: '#4284f4' },
      { key: 'facebook', name: 'Facebook', color: '#3c65c4' },
      { key: 'github', name: 'GitHub', color: '#202326' }
    ],
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
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

<template>
    <form class="px-2">
        <v-row>
            <v-text-field
                v-model="username"
                :error-messages="usernameErrors"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
                label="Username"
                disabled
                class="mr-2"
            />
            <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                label="E-Mail*"
                required
            />
        </v-row>
        <v-row>
            <v-text-field
                v-model="firstName"
                :error-messages="firstNameErrors"
                @input="$v.firstName.$touch()"
                @blur="$v.firstName.$touch()"
                label="First Name*"
                required
                class="mr-2"
            />
            <v-text-field
                v-model="lastName"
                :error-messages="lastNameErrors"
                @input="$v.lastName.$touch()"
                @blur="$v.lastName.$touch()"
                label="Last Name*"
                required
            />
        </v-row>
        <v-row>
            <v-text-field
                v-model="position"
                :error-messages="positionErrors"
                :counter="20"
                @blur="$v.position.$touch()"
                label="Position"
                class="mr-2"
            />
            <v-text-field
                v-model="location"
                :error-messages="locationErrors"
                :counter="25"
                @blur="$v.location.$touch()"
                label="Location"
            />
        </v-row>
        <v-row class="mt-6">
            <v-textarea
                v-model="bio"
                :error-messages="bioErrors"
                @blur="$v.bio.$touch()"
                label="About me"
                height="100"
            />
        </v-row>
        <v-switch
            v-model="isDarkTheme"
            @change="switchTheme"
            prepend-icon="mdi-palette"
            hint="Brad's button"
        ></v-switch>

        <v-btn @click="submit" class="mr-4">submit</v-btn>
    </form>
</template>

<script>
import formValidatorMixin from '@/mixins/formValidatorMixin'
import { mapState } from 'vuex'

export default {
    name: 'SettingsPage',
    mixins: [formValidatorMixin],
    data: () => ({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        position: '',
        location: '',
        bio: '',
        theme: 'dark',
        isDarkTheme: true
    }),
    head: () => ({
        title: 'Settings'
    }),
    created() {
        Object.keys(this.user).forEach((attr) => {
            if (this[attr] !== undefined) {
                this[attr] = this.user[attr]
            }
        })
        this.isDarkTheme = this.$vuetify.theme.isDark
        this.theme = this.$vuetify.theme.isDark ? 'dark' : 'light'
    },
    computed: {
        ...mapState('auth', ['loggedIn', 'user'])
    },
    methods: {
        async submit() {
            this.$v.$touch()
            const payload = {
                update: {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    position: this.position,
                    location: this.location,
                    bio: this.bio,
                    theme: this.theme
                },
                userId: this.user._id
            }

            try {
                await this.$store.dispatch('user/updateUser', payload)
                this.showSubmitSuccess()
            } catch (e) {
                this.showSubmitError({
                    message: e.message || e
                })
            }
        },
        switchTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark'
            this.isDark = !this.isDark
            this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
        }
    },
    notifications: {
        showSubmitError: {
            title: 'Details Edit Failed',
            message: 'Failed to update you profile',
            type: 'error'
        },
        showSubmitSuccess: {
            title: 'Details Edit Success',
            message: 'Thank you for updating your profile!',
            type: 'success'
        }
    }
}
</script>

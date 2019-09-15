<template>
    <form>
        <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            :counter="10"
            label="Title"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
        ></v-text-field>
        <v-text-field
            v-model="description"
            :error-messages="descriptionErrors"
            label="Description"
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
        ></v-text-field>
        <v-select
            v-model="select"
            :items="items"
            :error-messages="selectErrors"
            label="Priority"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
        ></v-select>
        <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Do you agree?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn class="mr-4" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
    </form>
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'

export default {
    // middleware: ['auth'],
    components: {},
    mixins: [formValidatorMixin],
    data: () => ({
        drawer: null,
        title: '',
        description: '',
        error: null,
        submitStatus: null
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
        clear() {
            // const response = this.$store.dispatch('user/fetchUsers')
            this.$v.$reset()
            this.name = ''
            this.email = ''
            this.select = null
            this.checkbox = false
        }
    }
}
</script>

import { validationMixin } from 'vuelidate'
import {
    alpha,
    required,
    email,
    minLength,
    maxLength,
    sameAs
} from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    validations: {
        name: { alpha },
        email: {
            required,
            email
            // async isUnique(value) {
            //     if (value === '') return true
            //     const response = await fetch(`/api/unique/${value}`)
            //     return Boolean(await response.json())
            // }
        },
        password: {
            required,
            minLength: minLength(6)
        },
        repeatPassword: {
            sameAsPassword: sameAs('password')
        },
        users: {
            minLength: minLength(1),
            email: {
                required,
                email
            }
        },
        title: {
            required,
            maxLength: maxLength(20)
        },
        description: {
            required
        },
        tags: {
            maxLength: maxLength(5)
        },
        select: {
            required
        }
        // loginForm: ['name', 'email'],
        // registerForm: ['users', 'tags']
    },
    computed: {
        checkboxErrors() {
            // const errors = []
            // if (!this.$v.checkbox.$dirty) return errors
            // !this.$v.checkbox.checked &&
            //     errors.push('You must agree to continue!')
            // return errors
        },
        selectErrors() {
            // const errors = []
            // if (!this.$v.select.$dirty) return errors
            // !this.$v.select.required && errors.push('Item is required')
            // return errors
        },
        nameErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.maxLength &&
                errors.push('Name must be at most 10 characters long')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },
        emailErrors() {
            const errors = []
            if (!this.$v.email.$error) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$error) return errors
            !this.$v.password.minLength &&
                errors.push('Must be at least 6 characters')
            !this.$v.password.required && errors.push('Password is required')
            return errors
        },
        titleErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.maxLength &&
                errors.push('Name must be at most 10 characters long')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },
        descriptionErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.maxLength &&
                errors.push('Name must be at most 10 characters long')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        }
    },
    methods: {
        focusFirstStatus(component = this) {
            if (component.status) {
                component.$el.focus()
                return true
            }

            let focused = false

            component.$children.some((childComponent) => {
                focused = this.focusFirstStatus(childComponent)
                return focused
            })

            return focused
        },
        validate() {
            this.$v.$touch()
            this.$nextTick(() => this.focusFirstStatus())
        }
    }
}

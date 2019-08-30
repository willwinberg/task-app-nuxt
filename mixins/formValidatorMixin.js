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
      email,
      async isUnique(value) {
        if (value === '') return true
        const response = await fetch(`/api/unique/${value}`)
        return Boolean(await response.json())
      }
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
    tags: {
      maxLength: maxLength(5)
    }
    // loginForm: ['name', 'email'],
    // registerForm: ['users', 'tags']
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

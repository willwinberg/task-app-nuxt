<template>
    <UserProvider>
        <FormFactory :fields="fields" :id="id" />
    </UserProvider>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import FormFactory from '@@/components/form/FormFactory.vue'
import FormInput from '@@/components/form/FormInput.vue'
import FormTextarea from '@@/components/form/FormTextarea.vue'
import UserProvider from '@@/components/UserProvider.vue'

export default {
    name: 'UserForm',
    components: {
        FormFactory,
        FormInput,
        FormTextarea,
        UserProvider
    },
    props: {
        // Passing id makes the form load an existing user and switches the form into editing mode.
        id: {
            default: null,
            type: [Number, String]
        }
    },
    created() {
        this.fields = [
            {
                component: FormInput,
                label: 'Name',
                name: 'name',
                options: {
                    attrs: {
                        placeholder: 'Your name'
                    }
                },
                validation: {
                    required
                }
            },
            {
                component: FormTextarea,
                label: 'Bio',
                name: 'bio',
                options: {
                    attrs: {
                        placeholder: 'About you'
                    }
                }
            }
        ]
    }
}
</script>

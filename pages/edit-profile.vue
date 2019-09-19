<template>
    <div>
        <h2>Create User Form</h2>
        <UserForm />

        <h2>Edit User Form</h2>
        <UserForm :id="1" />
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import FormBuilder from '@@/builders/FormBuilder'

import UserProvider from '@@/components/form/UserProvider.vue'
import FormInput from '@@/components/form/FormInput.vue'
import FormTextarea from '@@/components/form/FormTextarea.vue'

export default {
    name: 'EditProfilePage',
    components: {
        UserForm: new FormBuilder()
            .withProvider(UserProvider)
            .addField({
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
            })
            .addField({
                component: FormTextarea,
                label: 'Bio',
                name: 'bio',
                options: {
                    attrs: {
                        placeholder: 'About you'
                    }
                }
            })
            .build()
    }
}
</script>

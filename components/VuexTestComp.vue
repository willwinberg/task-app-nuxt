<template>
    <div class="justify-content-between row">
        <nested-test v-model="elements" class="col-8" />
        <raw-displayer :title="'Vuex Store'" :value="elements" class="col-4" />
    </div>
</template>

<script>
import NestedTest from './nested/nested-test.vue'
import rawDisplayer from './infra/raw-displayer.vue'
export default {
    name: 'NestedWithVmodel',
    display: 'Nested (v-model & vuex)',
    order: 16,
    components: {
        NestedTest,
        rawDisplayer
    },
    computed: {
        elements: {
            get() {
                return this.$store.state.nested.elements
            },
            set(value) {
                this.$store.dispatch('nested/updateElements', value)
            }
        }
    },
    methods: {}
}
</script>

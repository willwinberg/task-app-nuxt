<template>
    <BrowseList />
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'
import BrowseList from '@@/components/BrowseList'

export default {
    // middleware: ['auth'],
    components: {
        BrowseList
    },
    mixins: [formValidatorMixin],
    data: () => ({}),
    computed: {},
    methods: {}
}
</script>

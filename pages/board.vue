<template>
    <Board />
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'
import Board from '@@/components/Board'

export default {
    layout: 'unauthenticated',
    // middleware: ['auth'],
    components: {
        Board
    },
    mixins: [formValidatorMixin],
    data: () => ({
        drawer: null,
        email: '',
        password: '',
        error: null,
        submitStatus: null
    }),
    computed: {},
    methods: {}
}
</script>

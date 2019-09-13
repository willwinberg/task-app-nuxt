<template>
    <Board />
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'
import Board from '@@/components/Board'

export default {
    // middleware: ['auth'],
    components: {
        Board
    },
    mixins: [formValidatorMixin],
    data: () => ({}),
    computed: {},
    methods: {}
}
</script>

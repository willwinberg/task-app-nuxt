<template>
    <BrowseList />
</template>

<script>
import formValidatorMixin from '@@/mixins/formValidatorMixin'
import BrowseList from '@@/components/BrowseList'

export default {
    name: 'BrowsePage',
    components: {
        BrowseList
    },
    mixins: [formValidatorMixin],
    head: () => ({
        title: 'Browse'
    })
}
</script>

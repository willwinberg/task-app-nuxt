<template>
    <BrowseList />
</template>

<script>
import BrowseList from '@@/components/BrowseList'

export default {
    name: 'BrowsePage',
    components: {
        BrowseList
    },
    head: () => ({
        title: 'Browse'
    })
}
</script>

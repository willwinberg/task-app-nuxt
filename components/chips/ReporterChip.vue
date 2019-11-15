<template>
    <v-chip>Reported by {{ reporter }}</v-chip>
</template>

<script>
export default {
    props: {
        reporter: {
            type: String,
            default: 'None'
        }
    }
}
</script>

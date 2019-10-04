<template>
    <v-chip class="overline">{{ priority }}</v-chip>
</template>

<script>
export default {
    props: ['priority'],
    data: () => ({
        value: true
    })
}
</script>

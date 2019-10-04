<template>
    <v-chip pill>
        <v-avatar left color="red">
            {{ site.split('')[0] }}
        </v-avatar>
        {{ site }}
    </v-chip>
</template>

<script>
export default {
    props: ['site'],
    data: () => ({
        value: true
    })
}
</script>

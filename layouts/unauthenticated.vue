<template>
    <v-app>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <nuxt />
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    // props: {
    //   source: String
    // },
    data: () => ({
        drawer: null
    })
}
</script>

<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-alert v-if="$auth.$state.redirect" type="error"
                            >You have to login before accessing to
                            {{ $auth.$state.redirect }}</v-alert
                        >
                        <nuxt />
                    </v-col>
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

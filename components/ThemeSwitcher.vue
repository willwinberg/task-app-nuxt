<template>
    <v-switch
        append-icon="mdi-palette"
        hint="Brad's button"
        @change="switchTheme"
    ></v-switch>
</template>

<script>
export default {
    inject: ['theme'],
    methods: {
        switchTheme() {
            const switchOff = this.$vuetify.dark
                ? 'theme--light'
                : 'theme--dark'
            const switchOn = this.$vuetify.dark ? 'theme--dark' : 'theme--light'
            const themed = document.getElementsByClassName(switchOff)

            Array.from(themed).forEach((el) => {
                el.classList.remove(switchOff)
                el.classList.add(switchOn)
            })

            this.$vuetify.dark = !this.$vuetify.dark
            // this.theme.isDark = !this.theme.isDark
        }
    }
}
</script>

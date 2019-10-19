<template>
    <v-switch
        append-icon="palette"
        hint="switch theme"
        @change="switchTheme"
    ></v-switch>
</template>

<script>
export default {
    inject: ['theme'],
    methods: {
        switchTheme() {
            const switchOff = this.$vuetify.dark
                ? 'theme--dark'
                : 'theme--light'
            const switchOn = this.$vuetify.dark ? 'theme--light' : 'theme--dark'
            const themed = document.getElementsByClassName(switchOff)

            Array.from(themed).forEach((el) => {
                el.classList.remove(switchOff)
                el.classList.add(switchOn)
            })

            this.$vuetify.dark = !this.$vuetify.dark
            this.theme.isDark = !this.theme.isDark
        }
    }
}
</script>

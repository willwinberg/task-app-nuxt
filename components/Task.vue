<template>
    <v-card :color="item.color" dark>
        <v-list-item three-line>
            <v-list-item-content class="align-self-start">
                <v-list-item-title
                    class="headline mb-2"
                    v-text="item.title"
                ></v-list-item-title>

                <v-list-item-subtitle
                    v-text="item.artist"
                ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="125" tile>
                <v-img :src="item.src"></v-img>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

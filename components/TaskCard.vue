<template>
    <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4" v-text="task.priority"></div>
                <v-list-item-title
                    class="headline mb-1"
                    v-text="task.title"
                ></v-list-item-title>
                <v-list-item-subtitle
                    v-text="task.description"
                ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                <v-img :src="task.src"></v-img>
            </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
            <v-btn outlined text>Edit</v-btn>
            <v-btn outlined text>delete</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        task: Object
    }
}
</script>

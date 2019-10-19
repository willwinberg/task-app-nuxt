<template>
    <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on }">
            <v-btn outlined text v-on="on">Delete</v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">
                Are you sure?
            </v-card-title>

            <v-card-text>
                Are you sure you want to delete this task? This action is
                irreversible.
            </v-card-text>

            <v-card-actions>
                <div class="flex-grow-1"></div>

                <v-btn color="green" text @click="dialog = false">
                    Cancel
                </v-btn>

                <v-btn color="red" text @click="dialog = false">
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        }
    }
}
</script>

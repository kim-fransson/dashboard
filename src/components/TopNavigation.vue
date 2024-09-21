<script setup>

</script>

<template>
    <v-app-bar :elevation="2">
        <v-app-bar-title>Dashboard</v-app-bar-title>

        <template v-slot:append>
            <v-avatar color="info">
                <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
        </template>
    </v-app-bar>
</template>
<script setup>
import ThemeToggle from './ThemeToggle.vue';


</script>

<template>
    <v-app-bar :elevation="2">
        <v-app-bar-title>Dashboard</v-app-bar-title>

        <template v-slot:append>
            <ThemeToggle class="mr-4" />
            <v-avatar size="small" color="#ff9e2b">
                <v-icon icon="$smile"></v-icon>
            </v-avatar>
        </template>
    </v-app-bar>
</template>
<script setup>

import { ref, watchEffect } from 'vue';
import { useTheme } from 'vuetify'

const theme = useTheme()
const selectedTheme = ref(theme.global.current.value.dark ? 'light' : 'dark')

watchEffect(() => theme.global.name.value = selectedTheme.value)

const aliases = {
    dark: '$moon',
    light: '$sun',
};

function getIcon(theme) {
    return aliases[theme] || null;
}


</script>

<template>
    <div class="d-flex align-center ga-2">
        <v-switch v-model="selectedTheme" false-value="dark" true-value="light" hide-details></v-switch>
        <v-avatar color="#696ffb" size="x-small">
            <v-icon :icon="getIcon(selectedTheme)"></v-icon>
        </v-avatar>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import RadarChart from './RadarChart.vue';

const loaded = ref(false)
const data = ref(null)

onMounted(async () => {
    try {
        await fetch('/api/sales/regions')
            .then((res) => res.json())
            .then((json) => data.value = json.data)
    } catch (error) {
        // nothing 😈
    } finally {
        loaded.value = true
    }
})

</script>

<template>
    <v-card class="fill-height pa-4">
        <h2 class="text-h6">Sales by Region</h2>
        <RadarChart v-if="loaded" :data />
    </v-card>
</template>
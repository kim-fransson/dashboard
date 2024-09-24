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
    <v-card v-if="loaded" class="fill-height pa-4">
        <h2 class="text-h6 font-weight-bold">Sales by Region</h2>
        <RadarChart :data />
    </v-card>
    <v-skeleton-loader v-else type="card"></v-skeleton-loader>
</template>
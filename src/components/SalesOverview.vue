<script setup>

import { computed, onMounted, ref } from 'vue';

import { formatNumber } from '@/utils/formatNumber';
import LineChart from './LineChart.vue';

const loaded = ref(false)
const data = ref(null)

onMounted(async () => {
    try {
        await fetch('/api/sales/overview')
            .then((res) => res.json())
            .then((json) => data.value = json.data)
    } catch (error) {
        // nothing 😈
    } finally {
        loaded.value = true
    }
})

const totalRevenue = computed(() => {
    const number = data.value.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
    return formatNumber(number)
})

const totalTarget = computed(() => {
    const number = data.value.datasets[1].data.reduce((acc, curr) => acc + curr, 0);
    return formatNumber(number)
})

const revenueData = ref([
    { label: 'Total Revenue', amount: totalRevenue, iconColor: '#696ffb' },
    { label: 'Total Target', amount: totalTarget, iconColor: '#ff9e2b' },
]);

</script>

<template>
    <v-card v-if="loaded" class="pa-4">
        <header class="d-flex  justify-space-between align-center mb-8">
            <h2 class="text-h6">Sales Overview</h2>
            <div class="d-flex flex-wrap ga-4">
                <div v-for="item in revenueData" :key="item.label">
                    <div class="text-sm text-grey">
                        <v-icon :style="{ color: item.iconColor }" icon="mdi-circle-medium"></v-icon>
                        {{ item.label }}
                    </div>
                    <span class="ml-2">$ {{ item.amount }}</span>
                </div>
            </div>
        </header>
        <LineChart :data label="Revenue" height="250px" />
    </v-card>
</template>
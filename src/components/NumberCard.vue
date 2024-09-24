<script setup>
import { formatNumber } from '@/utils/formatNumber';
import { computed } from 'vue';


const props = defineProps(['number'])

const negativeGrowth = computed(() => props.number.compareToLastMonth.sign === '-')

</script>

<template>
    <v-card class="pa-4">
        <h2 class="text-h6 font-weight-bold">{{ number.name }}</h2>
        <p class="text-h4 mt-1">{{ number.prefix }} {{ formatNumber(number.value) }}{{ number.postfix }}</p>
        <div class="mt-2 d-flex align-center ga-2">
            <v-chip variant="flat" density="comfortable" size="small"
                :color="negativeGrowth ? 'red-lighten-1' : 'green-lighten-1'"
                :prepend-icon="negativeGrowth ? 'mdi-arrow-down-thin' : 'mdi-arrow-up-thin'">
                {{ formatNumber(number.compareToLastMonth.value) }}%
            </v-chip>
            <p class="text-caption opacity-80 text-no-wrap">
                Compared to last month
            </p>
        </div>
    </v-card>
</template>
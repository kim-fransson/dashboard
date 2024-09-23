<script setup>
import { computed } from 'vue';


const props = defineProps(['number'])

const negativeGrowth = computed(() => props.number.compareToLastMonth.sign === '-')

</script>

<template>
    <v-card class="pa-4">
        <h2 class="text-h6">{{ number.name }}</h2>
        <p class="text-h4 mt-1">{{ number.value }}{{ number.postfix }}</p>
        <div class="text-caption mt-2 text-grey d-flex align-center ga-2 text-no-wrap">
            <v-chip variant="flat" density="comfortable" size="small" :color="negativeGrowth ? 'red' : 'green'"
                :prepend-icon="negativeGrowth ? 'mdi-arrow-down-thin' : 'mdi-arrow-up-thin'">
                {{ number.compareToLastMonth.value }}%
            </v-chip>
            Compared to last month
        </div>
    </v-card>
</template>
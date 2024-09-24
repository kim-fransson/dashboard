<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

defineProps(['data'])

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            filter: function (tooltipItem) {
                return tooltipItem.datasetIndex === 0
            }
        }
    },
    rotation: -97,
    circumference: 195,
    cutout: '60%',
}
const plugins = []

</script>

<template>
    <div class="position-relative" :style="{ margin: '-65px 0' }">
        <Doughnut :data :options :plugins />
    </div>
</template>
<script setup>
import { templateRef } from '@vueuse/core';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { computed, nextTick, ref, watch } from 'vue';
import { Doughnut } from 'vue-chartjs'
import { useTheme } from 'vuetify/lib/framework.mjs';

ChartJS.register(ArcElement, Tooltip, Legend)

defineProps(['data'])

const theme = useTheme()
const selectedTheme = ref(theme.global.current.value.dark ? 'dark' : 'light')

const options = computed(() => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        rotation: -97,
        circumference: 195,
        cutout: '60%',
        elements: {
            arc: {
                backgroundColor: function (context) {
                    const index = context.dataIndex;
                    const datasetIndex = context.datasetIndex;
                    if (datasetIndex === 0) {
                        const colors = ['rgba(105, 111, 251)', selectedTheme.value === 'dark' ? '#3a3d89' : '#999dfc'];
                        return colors[index];
                    } else {
                        return 'rgba(105, 111, 251, 0.2)';
                    }
                },
                hoverBackgroundColor: function (context) {
                    const index = context.dataIndex;
                    const datasetIndex = context.datasetIndex;
                    if (datasetIndex === 0) {
                        const colors = ['rgba(105, 111, 251)', selectedTheme.value === 'dark' ? '#3a3d89' : '#999dfc'];
                        return colors[index];
                    } else {
                        return 'rgba(105, 111, 251, 0.2)';
                    }
                }
            }
        }
    }
})
const plugins = []

const gaugeChart = ref(null)

watch(() => theme.global.current.value.dark, async (newValue) => {
    selectedTheme.value = newValue ? 'dark' : 'light';

    // Ensure the DOM is updated before accessing chartRef
    await nextTick();

    const chart = gaugeChart.value?.chart;

    if (chart) {
        console.log('Chart instance found:', chart);
        chart.update();
    } else {
        console.log('Chart instance not found');
    }
});

</script>

<template>
    <div class="position-relative" :style="{ margin: '-65px 0' }">
        <Doughnut ref="gaugeChart" :data :options :plugins />
    </div>
</template>
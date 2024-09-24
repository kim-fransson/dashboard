<script setup>

import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { useTheme } from 'vuetify/lib/framework.mjs';
import { computed, ref, watch } from 'vue';

const props = defineProps(['data', 'label', 'height'])

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
)

const theme = useTheme()
const selectedTheme = ref(theme.global.current.value.dark ? 'dark' : 'light')

const backgroundPlugin = {
    id: 'backgroundPlugin',
    beforeDraw: (chart) => {
        const { ctx, chartArea } = chart;
        const { top, bottom } = chartArea;
        const labels = chart.data.labels;
        const alternatingBackgroundColors = selectedTheme.value === 'dark'
            ? ['rgba(105, 111, 251, 0.3)', 'rgba(105, 111, 251, 0.2)'] : ['rgba(105, 111, 251, 0.12)', 'rgba(105, 111, 251, 0.04)'];

        for (let i = 0; i < labels.length - 1; i++) {
            ctx.fillStyle = alternatingBackgroundColors[i % 2];
            const xStart = chart.scales.x.getPixelForTick(i);
            const xEnd = chart.scales.x.getPixelForTick(i + 1);
            ctx.fillRect(xStart, top, xEnd - xStart, bottom - top);
        }
    }
};

const thresholdPlugin = {
    id: 'thresholdPlugin',
    beforeDraw: (chart) => {
        const { ctx, chartArea } = chart;
        const { left, right } = chartArea;

        ctx.save();
        ctx.strokeStyle = selectedTheme.value === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0,0,0,0.16)';
        ctx.setLineDash([5, 5]); // Dashed line style

        // Upper threshold line at 20000
        const upperY = chart.scales.y.getPixelForValue(20000);
        ctx.beginPath();
        ctx.moveTo(left, upperY);
        ctx.lineTo(right, upperY);
        ctx.stroke();

        // Lower threshold line at 10000
        const lowerY = chart.scales.y.getPixelForValue(10000);
        ctx.beginPath();
        ctx.moveTo(left, lowerY);
        ctx.lineTo(right, lowerY);
        ctx.stroke();

        ctx.restore();
    }
};

const hoverLinePlugin = {
    id: 'hoverLinePlugin',
    afterDatasetsDraw: (chart) => {
        const { ctx, tooltip } = chart;

        if (tooltip._active && tooltip._active.length) {
            const activePoint = tooltip._active[0];
            const x = activePoint.element.x;
            ctx.setLineDash([5, 5]); // Dashed line style

            ctx.save();
            ctx.strokeStyle = selectedTheme.value === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0,0,0,0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, chart.chartArea.top);
            ctx.lineTo(x, chart.chartArea.bottom);
            ctx.stroke();
            ctx.restore();
        }
    }
};

const options = computed(() => {
    return {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: true,
                },
                ticks: {
                    color: selectedTheme.value === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                },
            },
            y: {
                beginAtZero: true,
                max: 25000,
                ticks: {
                    color: selectedTheme.value === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                    stepSize: 10000,
                    callback: (value) => {
                        // Format the value as $Xk
                        if (value === 0) {
                            return '$0'
                        }
                        return '$' + (value / 1000).toFixed(0) + 'k';
                    }
                },
                grid: {
                    display: false,
                },
                position: 'right'
            }
        },
        plugins: {
            tooltip: {
                mode: 'nearest',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        return ` ${props.label}: ` + context.raw.toLocaleString();
                    }
                },
                displayColors: true,
            },
            legend: {
                display: false,
            },
        },
    }
})

const plugins = [backgroundPlugin, thresholdPlugin, hoverLinePlugin]

const lineChart = ref(null)

watch(() => theme.global.current.value.dark, (newValue) => {
    selectedTheme.value = newValue ? 'dark' : 'light';
    if (lineChart.value?.chart) {
        lineChart.value.chart.update();
    }
});

</script>

<template>
    <div class="position-relative" :style="{ height }">
        <Line ref="lineChart" :data :options :plugins />
    </div>
</template>
<script setup>
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'

const props = defineProps(['data', 'height'])


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)

const customLabelsPlugin = {
    id: 'customLabelsPlugin',
    afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        const data = chart.data.labels;
        const values = props.data.datasets[0].data;

        chart.scales.r._pointLabelItems.forEach((pointLabelItem, i) => {
            let { x, y } = pointLabelItem;
            let offset = 0;

            if (i === 0) {
                offset = 16
            }

            if (i === 3) {
                offset = -10
            }

            // Render the first line (label)
            ctx.font = `14px ${ctx.font.split(' ').pop()}`;
            ctx.fillStyle = '#9E9E9E';
            ctx.textAlign = 'center';
            ctx.fillText(data[i], x, (y + 16) + offset); // Further reduced spacing

            // Render the second line (value)
            ctx.font = `bold 16px ${ctx.font.split(' ').pop()}`;
            ctx.fillStyle = 'white';
            ctx.fillText(values[i], x, y + offset);
        });
    }
}


const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
            pointLabels: {
                color: '#9E9E9E',
                padding: 20,
                callback: function () { return '' },
            },
            ticks: {
                callback: function () { return "" },
                backdropColor: "rgba(0, 0, 0, 0)",
            },
            angleLines: {
                display: false
            },
            suggestedMin: 1000,
            suggestedMax: 3000
        }
    },
    plugins: {
        legend: {
            display: false,
        },
    },
}

const plugins = [customLabelsPlugin]

</script>

<template>
    <div class="position-relative" :style="{ height }">
        <Radar :data="data" :options :plugins />
    </div>
</template>
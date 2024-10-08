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
import { computed, ref, watch } from 'vue';
import { Radar } from 'vue-chartjs'
import { useTheme } from 'vuetify/lib/framework.mjs';

const props = defineProps(['data', 'height'])

const theme = useTheme()
const selectedTheme = ref(theme.global.current.value.dark ? 'dark' : 'light')


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)

const customLabelsPlugin =
{
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
            ctx.fillStyle = selectedTheme.value === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
            ctx.textAlign = 'center';
            ctx.fillText(data[i], x, (y + 16) + offset); // Further reduced spacing

            // Render the second line (value)
            ctx.font = `bold 16px ${ctx.font.split(' ').pop()}`;
            ctx.fillStyle = selectedTheme.value === 'dark' ? 'white' : "black";
            ctx.fillText(values[i], x, y + offset);
        });
    }
}

const outerSegmentPlugin = {
    id: 'outerSegmentPlugin',
    beforeDatasetsDraw(chart) {
        const ctx = chart.ctx;
        const { r } = chart.scales;
        const centerX = r.xCenter;
        const centerY = r.yCenter;

        // Get the exact radius for the outermost grid line and the second-to-last grid line
        const outerRadius = r.getDistanceFromCenterForValue(r.max); // Radius of the outermost grid line
        const secondLastRadius = r.getDistanceFromCenterForValue(r.ticks[r.ticks.length - 2].value); // Radius of the second-to-last grid line

        const angleStep = (2 * Math.PI) / chart.data.labels.length; // Angle between each vertex (based on number of labels)

        ctx.save();
        ctx.beginPath();

        // Draw the outer boundary (outermost polygon)
        for (let i = 0; i < chart.data.labels.length; i++) {
            const angle = i * angleStep - Math.PI / 2; // Start at the top (-PI/2 for 90 degrees)
            const x = centerX + outerRadius * Math.cos(angle); // Calculate X position
            const y = centerY + outerRadius * Math.sin(angle); // Calculate Y position

            if (i === 0) {
                ctx.moveTo(x, y); // Move to the first vertex
            } else {
                ctx.lineTo(x, y); // Draw a line to the next vertex
            }
        }
        ctx.fillStyle = selectedTheme.value === 'dark' ? 'rgba(105, 111, 251, 0.12)' : 'rgba(105, 111, 251, 0.08)';
        ctx.fill();
        ctx.closePath();

        // Draw the inner boundary (second-to-last polygon)
        ctx.beginPath();
        for (let i = 0; i < chart.data.labels.length; i++) {
            const angle = i * angleStep - Math.PI / 2; // Start at the top (-PI/2)
            const x = centerX + secondLastRadius * Math.cos(angle); // Calculate X position
            const y = centerY + secondLastRadius * Math.sin(angle); // Calculate Y position

            if (i === 0) {
                ctx.moveTo(x, y); // Move to the first vertex
            } else {
                ctx.lineTo(x, y); // Draw a line to the next vertex
            }
        }
        ctx.closePath();

        // Fill the area between the two boundaries (outermost segment)
        ctx.fillStyle = selectedTheme.value === 'dark' ? 'rgba(105, 111, 251, 0.08)' : 'rgba(105, 111, 251, 0.08)';
        ctx.fill();

        ctx.restore();
    }
};

const options = computed(() => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 1,
        pointRadius: 5,
        backgroundColor: selectedTheme.value === 'dark' ? 'rgba(105, 111, 251)' : 'rgba(105, 111, 251, 0.32)',
        borderColor: selectedTheme.value === 'dark' ? 'rgba(105, 111, 251, 0.8)' : 'rgba(105, 111, 251)',
        pointBackgroundColor: selectedTheme.value === 'dark' ? 'rgba(105, 111, 251)' : 'rgba(105, 111, 251)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        scales: {
            r: {
                pointLabels: {
                    padding: 20,
                    callback: function () { return '' },
                },
                ticks: {
                    callback: function () { return "" },
                    backdropColor: "rgba(0, 0, 0, 0)",
                },
                angleLines: {
                    display: true,
                    color: 'rgba(105, 111, 251, 0.08)'
                },
                grid: {
                    display: false,
                },
                suggestedMin: 1000,
                suggestedMax: 3000
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.raw.toLocaleString();
                    }
                },
                displayColors: false,
            }
        },
    }
})

const plugins = [customLabelsPlugin, outerSegmentPlugin]

const radarChart = ref(null)

watch(() => theme.global.current.value.dark, (newValue) => {
    selectedTheme.value = newValue ? 'dark' : 'light';
    if (radarChart.value?.chart) {
        radarChart.value.chart.update();
    }
});

</script>

<template>
    <div class="position-relative" :style="{ height }">
        <Radar ref="radarChart" :data="data" :options :plugins />
    </div>
</template>
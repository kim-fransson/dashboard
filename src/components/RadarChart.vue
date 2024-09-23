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
        ctx.fillStyle = 'rgba(105, 111, 251, 0.08)'; // Semi-transparent red
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
        ctx.fillStyle = 'rgba(105, 111, 251, 0.12)';
        ctx.fill();

        ctx.restore();
    }
};


const options = {
    responsive: true,
    maintainAspectRatio: false,
    pointBorderWidth: 2,
    pointRadius: 5,
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

const plugins = [customLabelsPlugin, outerSegmentPlugin]

</script>

<template>
    <div class="position-relative" :style="{ height }">
        <Radar :data="data" :options :plugins />
    </div>
</template>
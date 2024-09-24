<script setup>
import { formatNumber } from '@/utils/formatNumber';
import _ from 'lodash';
import { onMounted, ref } from 'vue';


const loaded = ref(false)
const integrations = ref(null)

const aliases = {
    stripe: '$stripe',
    shopify: '$shopify',
    zapier: '$zapier',
};

const headers = [
    { title: 'Application', value: 'application' },
    { title: 'Type', value: 'type' },
    { title: 'Rate', value: 'rate', width: '200px' }, // Set your desired width here
    { title: 'Profit', value: 'profit' }
]

function getIcon(application) {
    return aliases[application] || null;
}

onMounted(async () => {
    try {
        await fetch('/api/integrations')
            .then((res) => res.json())
            .then((json) => integrations.value = json.data)
    } catch (error) {
        // nothing 😈
    } finally {
        loaded.value = true
    }
})

</script>

<template>
    <v-card v-if="loaded" class="fill-height pa-4">
        <h2 class="text-h6 font-weight-bold mb-4">List of Integrations</h2>
        <v-data-table :items="integrations" :headers item-value="application" show-select hide-default-footer>
            <template v-slot:item.application="{ value }">
                <div class="d-flex align-center ga-2">
                    <v-avatar class="border" rounded="0" size="small">
                        <v-icon :icon="getIcon(value)"></v-icon>
                    </v-avatar>
                    {{ _.capitalize(value) }}
                </div>
            </template>

            <template v-slot:item.rate="{ value }">
                <div class="d-flex align-center ga-2">
                    <v-progress-linear :model-value="value" rounded color="#696ffb" height="6">
                    </v-progress-linear>
                    <span class="text-caption">{{ value }}%</span>
                </div>
            </template>

            <template v-slot:item.profit="{ value }">
                <div class="d-flex align-center ga-2">
                    $ {{ formatNumber(value) }}
                </div>
            </template>
        </v-data-table>
    </v-card>
    <v-skeleton-loader v-else type="card"></v-skeleton-loader>

</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import GaugeChart from './GaugeChart.vue';
import { formatNumber } from '@/utils/formatNumber';

const loaded = ref(false)
const data = ref(null)

onMounted(async () => {
    try {
        await fetch('/api/users')
            .then((res) => res.json())
            .then((json) => data.value = json.data)
    } catch (error) {
        // nothing 😈
    } finally {
        loaded.value = true
    }
})

const numberOfPremiumUsers = computed(() => data.value.datasets[0].data[0])
const numberOfBasicUsers = computed(() => data.value.datasets[0].data[1])
const totalUser = computed(() => numberOfPremiumUsers.value + numberOfBasicUsers.value)

</script>

<template>
    <v-card v-if="loaded" class="pa-4">
        <h2 class="text-h6">Registered Users</h2>
        <div class="w-66 mx-auto mb-8 mt-4 position-relative">
            <GaugeChart :data />
            <div class="total-users">
                <v-avatar class="custom-avatar">
                    <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
                <span class="text-h4 mt-2">{{ formatNumber(totalUser, 0) }}</span>
                <span class="text-caption text-grey">Total users</span>
            </div>
        </div>
        <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center ga-2">
                <div class="pill premium" />
                <div>
                    <div>{{ numberOfPremiumUsers }}</div>
                    <div class="text-caption text-grey">Premium Users</div>
                </div>
            </div>

            <div class="d-flex align-center ga-2">
                <div>
                    <div class="text-end">{{ numberOfBasicUsers }}</div>
                    <div class="text-caption text-grey">Basic Users</div>
                </div>
                <div class="pill basic" />
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.pill {
    width: 4px;
    height: 30px;
    border-radius: 9999px;

    &.premium {
        background: rgba(105, 111, 251);
    }

    &.basic {
        background: rgba(105, 111, 251, 0.6);
    }
}

.custom-avatar {
    background: #3a3d89;
    border: 3px solid #2e316d !important;
}

.total-users {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    margin-top: 32px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
<script setup>
import { ref } from "vue";

import logo from '@/assets/logo.png'

const drawer = ref(true);
const rail = ref(true);

const navItems = ref([
    { icon: 'mdi-view-dashboard-outline', title: 'Dashboard', value: 'dashboard' },
    { icon: 'mdi-credit-card-outline', title: 'Payment', value: 'payment' },
    { icon: 'mdi-account-multiple-outline', title: 'Customers', value: 'customers' },
    { icon: 'mdi-message-text-outline', title: 'Messages', value: 'messages' },
    { divider: true },
    { icon: 'mdi-toolbox-outline', title: 'Product', value: 'product' },
    { icon: 'mdi-invoice-text-outline', title: 'Invoice', value: 'invoice' },
    { icon: 'mdi-chart-line', title: 'Analytics', value: 'analytics' },
    { divider: true },
    { icon: 'mdi-cog-outline', title: 'Settings', value: 'settings' },
    { icon: 'mdi-security', title: 'Security', value: 'security' },
    { icon: 'mdi-help-circle-outline', title: 'Help', value: 'help' },
    { divider: true },
    { icon: 'mdi-logout', title: 'Log Out', value: 'log-out' }
]);

</script>

<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item :prepend-avatar="logo" title="FindData" nav>
            <template v-slot:append>
                <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </template>
        </v-list-item>

        <v-list nav>
            <template v-for="(item, index) in navItems" :key="index">
                <v-divider v-if="item.divider" :thickness="2"></v-divider>
                <v-list-item v-else :prepend-icon="item.icon" :title="item.title" :value="item.value"></v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

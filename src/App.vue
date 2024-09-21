<script setup>
import CollapsableSidebar from './components/CollapsableSidebar.vue';
import TopNavigation from './components/TopNavigation.vue';


</script>

<template>
  <v-app>
    <v-layout>
      <CollapsableSidebar />

      <TopNavigation />

      <v-main>

      </v-main>
    </v-layout>
  </v-app>
</template>

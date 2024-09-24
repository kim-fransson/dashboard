<script setup>
import { onMounted, ref } from 'vue';
import CollapsableSidebar from './components/CollapsableSidebar.vue';
import TopNavigation from './components/TopNavigation.vue';
import NumberCard from './components/NumberCard.vue';
import SalesOverview from './components/SalesOverview.vue';
import SalesRegion from './components/SalesRegion.vue';
import RegisteredUsers from './components/RegisteredUsers.vue';
import ListOfIntegrations from './components/ListOfIntegrations.vue';

const numbers = ref([])
const loaded = ref(false)

onMounted(async () => {
  try {
    await fetch('/api/numbers')
      .then((res) => res.json())
      .then((json) => (numbers.value = json.numbers))
  } catch (error) {
    // nothing 😈
  } finally {
    loaded.value = true
  }
})

</script>

<template>
  <v-app>
    <v-layout>
      <CollapsableSidebar />

      <TopNavigation />

      <v-main>
        <v-container :fluid="true" class="mt-lg-10">
          <v-row>
            <v-col v-if="loaded" v-for="number in numbers" :key="number.id">
              <NumberCard :number />
            </v-col>
            <v-col v-else v-for="skeleton in [1, 2, 3, 4]" :key="skeleton">
              <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="8">
              <SalesOverview />
            </v-col>

            <v-col cols="12" md="4">
              <SalesRegion />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <RegisteredUsers />
            </v-col>
            <v-col cols="12" md="8">
              <ListOfIntegrations />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

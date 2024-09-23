<script setup>
import { ref, watchEffect } from 'vue';
import CollapsableSidebar from './components/CollapsableSidebar.vue';
import TopNavigation from './components/TopNavigation.vue';
import NumberCard from './components/NumberCard.vue';

const numbers = ref([])
const loading = ref(false)

watchEffect(async () => {
  try {
    await fetch('/api/numbers')
      .then((res) => res.json())
      .then((json) => (numbers.value = json.numbers))
  } catch (error) {
    // nothing 😈
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <v-app>
    <v-layout>
      <CollapsableSidebar />

      <TopNavigation />

      <v-main>
        <v-container class="mt-10">
          <v-row>
            <v-col v-for="number in numbers" :key="number.id">
              <NumberCard :number />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

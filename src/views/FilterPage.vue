<template>
  <div class="w-100 text-start">
    <router-link to="/">
      <img src="/arrow_back.svg" alt="Go to home">
    </router-link>
  </div>
  <section id="filter-page">
    <Filters />
    <main>
      <SpecieContainer
        specie="human"
      />
    </main>
  </section>
</template>

<script setup lang="ts">
import Filters from '../components/Filters.vue'
import SpecieContainer from '../components/SpecieContainer.vue';
</script>

<style scoped>

</style>
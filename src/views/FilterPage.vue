<template>
  <div class="position-absolute to-home">
    <router-link to="/">
      <img src="/arrow_back.svg" alt="Go to home">
    </router-link>
  </div>
  <section id="filter-page">
    <Filters 
      @loading-characters="loadingCharacters = true"
      @charaters-loaded="loadingCharacters = false"
    />
    <main>
      <SpecieContainer
        v-if="!loadingCharacters"
        specie="human"
        :is-in-filter="true"
      />
    <div v-else class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Filters from '../components/Filters.vue'
import SpecieContainer from '../components/SpecieContainer.vue';

const loadingCharacters = ref(false)
</script>

<style scoped>
  .to-home {
    top: 10px;
  }
</style>
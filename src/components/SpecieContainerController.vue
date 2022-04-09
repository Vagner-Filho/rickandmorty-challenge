<template>
  <div class="w-100 text-end mt-3 mb-3">
    <SearchBtn />
  </div>
  <SpecieContainer 
    specie="human"
  />
</template>

<script setup lang="ts">
import SearchBtn from './SearchBtn.vue';
import SpecieContainer from './SpecieContainer.vue';
</script>

<style scoped>

</style>
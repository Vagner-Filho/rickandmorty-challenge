<template>
  <div class="w-100 text-end mt-3 mb-3">
    <FilterBtn />
  </div>
  <SpecieContainer 
    specie="human"
  />
</template>

<script setup lang="ts">
import FilterBtn from './FilterBtn.vue';
import SpecieContainer from './SpecieContainer.vue';
</script>

<style scoped>

</style>
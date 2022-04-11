<template>
  <div class="w-100 text-end mt-3 mb-3">
    <FilterBtn />
  </div>
  <div class="controlles position-relative">
    <div v-for="(specie, index) in species" :key="index">
      <SpecieContainer
        v-if="index === selectedPage"
        :specie="specie"
        :is-in-filter="false"
      />
    </div>
    <span class="btn position-absolute left">
      <img src="/to_left_btn.svg" alt="" @click="setPage(-1)">
    </span>
    <span class="btn position-absolute right">
      <img src="/to_right_btn.svg" alt="" @click="setPage(1)">
    </span>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import FilterBtn from './FilterBtn.vue';
import SpecieContainer from './SpecieContainer.vue';

const species = reactive([
  "human",
  "alien",
  "humanoid",
  "unknown",
  "poopybutthole",
  "Mythological",
  "animal",
  "robot",
  "cronenberg",
  "disease"
])

const selectedPage = ref(0)

const setPage = (position: number) => {
  if (selectedPage.value + position === -1) selectedPage.value = 9
  else if (selectedPage.value + position === 10) selectedPage.value = 0
  else selectedPage.value += position
}
</script>

<style scoped>
  span.left {
    left: -20px;
    top: 170px;
  }
  span.right {
    right: -20px;
    top: 170px;
  }
</style>
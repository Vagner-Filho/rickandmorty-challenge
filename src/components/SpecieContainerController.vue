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
        @is-adding-characters="isAddingCharacters = true"
        @characters-added="isAddingCharacters = false"
      />
    </div>
    <span class="btn position-absolute left" v-show="!isAddingCharacters">
      <img src="/to_left_btn.svg" alt="" @click="setPage(-1)">
    </span>
    <span class="btn position-absolute right" v-show="!isAddingCharacters">
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
  "mythological",
  "animal",
  "robot",
  "cronenberg",
  "disease"
])

const isAddingCharacters = ref(false)
const selectedPage = ref(0)

// diferencial: Paginação
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
  @media (min-width: 576px) {
    span.left {
      left: -5px
    }
    span.right {
      right: -5px;
    }
  }
  @media (min-width: 768px) {

    span.left, span.right {
      top: 230px;
    }
    span.left > img, span.right > img {
      width: 25px;
    }
  }
  @media (min-width: 991px) {
    span.left {
      left: 5px
    }
    span.right {
      right: 5px;
    }
  }
</style>
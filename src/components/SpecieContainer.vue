<template>
  <section :id="`specie-container-${specie}`" class="specie-container">
    <header class="d-flex">
      <h1 class="white-font">{{ specieName }}</h1>
      <hr>
    </header>
    <main class="container-fluid">
      <div class="row">
        <div class="col-6 col-sm-4 col-md-3" v-for="item in 4"> 
          <RoundCharacterCard />
        </div>
      </div>
    </main>
    <footer class="mt-3">
      <button type="button" class="btn btn-primary">More</button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RoundCharacterCard from './RoundCharacterCard.vue';

  const props = defineProps<{
    specie: string
  }>()
  const specieName = computed(() => {
    const firstLetterUpperCase = props.specie.slice(0, 1)

    return `${firstLetterUpperCase.toUpperCase()}${props.specie.slice(1)}`
  })
</script>

<style scoped>
  section.specie-container > header {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  section.specie-container > header > hr {
    color: white;
    width: 95%;
    height: 2px;
    opacity: 1;
  }
  section.specie-container > header > h1 {
    margin-right: 10px;
    font-size: 1.3rem;
  }
  section.specie-container > main {
    max-height: 60vh;
    overflow-y: auto;
  }
  section.specie-container > footer > button {
    width: 100px;
    border-radius: 20px;
    height: 30px;
    line-height: 15px;
  }
</style>
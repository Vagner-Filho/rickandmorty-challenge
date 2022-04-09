<template>
  <div class="w-100 text-end mt-3 mb-3">
    <SearchBtn />
  </div>
  <section id="character-detail">
    <header></header>
    <main class="white-font">
      <h1>Character name</h1>
      <p>Status: Alive</p>
      <p>Species</p>
      <p>Origin</p>
    </main>
  </section>
</template>

<script setup lang="ts">
import SearchBtn from '../components/SearchBtn.vue';

</script>

<style scoped>
  section#character-detail {
    width: 230px;
    height: 360px;
    border-radius: 5px;
    border: 1px solid #E6E6E6;
    margin: auto;
  }
  section#character-detail > header {
    height: 60%;
    background-color: #e6e6e6;
  }
  section#character-detail > main {
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 5px;
  }
  section#character-detail > main > h1, p {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: auto;
    text-align: start;
    margin: 0;
  }
  section#character-detail > main > h1 {
    font-size: 1.2rem;
  }
</style>
<template>
  <div class="w-100 mt-3 mb-3 d-flex justify-content-between">
    <router-link to="/">
      <img src="/arrow_back.svg" alt="Go to home">
    </router-link>
    <FilterBtn />
  </div>
  <section v-if="!waitingResponse" id="character-detail">
    <header>
      <img :src="store.detailedCharacter.image" alt="" class="w-100">
    </header>
    <main class="white-font">
      <h1>{{ store.detailedCharacter.name }}</h1>
      <p>Status: {{ store.detailedCharacter.status }} <div :class="selectStatus" /></p>
      <p>Species: {{ store.detailedCharacter.species }}</p>
      <p>Origin: {{ store.detailedCharacter.origin.name }}</p>
    </main>
  </section>
  <!-- Spinner enquanto dados carregam -->
  <div v-else class="spinner-border text-primary" role="status"> 
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script setup lang="ts">
import FilterBtn from '../components/FilterBtn.vue';
import { useRoute } from 'vue-router';
import { useCharacterStore } from '../store/store';
import { computed, onMounted, ref } from 'vue';

const route = useRoute()
const store = useCharacterStore()
const waitingResponse = ref(false)
const selectStatus = computed(() => {
  return store.detailedCharacter.status === 'Alive' ? 'alive' : 'dead'
  // retorna status do personagem. Faltou cobrir o caso em "unknown"
})

onMounted( async () => {
  waitingResponse.value = true
  // busca o personagem pelo id inserido na rota
  // requisito: Usar rotas internamente para fazer detalhes de dados;
  const character = await store.getCharacter(parseInt(route.params.id.toString()))
  if (character instanceof Object) {
    store.$patch((state) => state.detailedCharacter = {...character})
  }
  waitingResponse.value = false
})
</script>

<style scoped>
  section#character-detail {
    width: 230px;
    height: auto;
    border-radius: 5px;
    border: 1px solid #E6E6E6;
    margin: auto;
  }
  section#character-detail > header {
    height: auto;
    background-color: #e6e6e6;
  }
  section#character-detail > main {
    min-height: 110px;
    max-height: 180px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 5px;
    background-color: rgba(0, 0, 0, 0.7);
  }
  section#character-detail > main > h1, p {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: start;
    margin: 0;
  }
  section#character-detail > main > h1 {
    font-size: 1.2rem;
  }
  .alive, .dead {
    width: 15px;
    height: 15px;
    border-radius: 17px;
    margin-left: 10px;
  }
  .alive {
    background-color: #1CFF4E;
  }
  .dead {
    background-color: red;
  }
  section#character-detail > main > p:nth-child(2) {
    display: inline-flex;
    align-items: center;
  }
  .spinner-border {
    width: 150px;
    height: 150px;
  }
  @media (min-width: 768px) {
    section#character-detail > main > h1 {
      font-size: 1.5rem;
    }
    section#character-detail > main > p {
      font-size: 1.2rem;
    }
  }
</style>
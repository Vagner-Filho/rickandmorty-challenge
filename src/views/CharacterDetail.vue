<template>
  <div class="w-100 mt-3 mb-3 d-flex justify-content-between">
    <router-link to="/filter">
      <img src="/arrow_back.svg" alt="Go to home">
    </router-link>
    <FilterBtn />
  </div>
  <section v-if="!waitingResponse" id="character-detail">
    <header class="col-b">
      <img :src="store.detailedCharacter.image" alt="" class="w-100">
    </header>
    <div class="col-a">
      <h1>{{ store.detailedCharacter.name }}</h1>
      <p>Status: {{ store.detailedCharacter.status }} <div :class="selectStatus" /></p>
    </div>
    <div class="descricao">
      <p>Species: {{ store.detailedCharacter.species }}</p>
      <p>Type: {{ store.detailedCharacter.type }}</p>
      <p>Origin: {{ store.detailedCharacter.origin.name }}</p>
      <p>Location: {{ store.detailedCharacter.location.name }}</p>
    </div>
  </section>
  
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
  if(store.detailedCharacter.status === 'Alive'){
    return 'alive'
  }else if(store.detailedCharacter.status === 'Dead'){
    return 'dead'
  }else{
    return 'unknown'
  }
  // retorna status do personagem. Faltou cobrir o caso em "unknown"
})
onMounted( async () => {
  waitingResponse.value = true
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
  section#character-detail .col-b{
    height: auto;
    background-color: #e6e6e6;
  }
  section#character-detail{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 5px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #e6e6e6;
  }
  section#character-detail > main > div > h1, p {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: start;
    margin: 0;
  }
  section#character-detail main > div > h1 {
    font-size: 1.5rem;
  }
  .alive, .dead, .unknown{
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
  .unknown{
    background-color: #A6A6A6;
  }
  section#character-detail .col-a > p:nth-child(2) {
    display: inline-flex;
    align-items: center;
  }
  .spinner-border {
    width: 150px;
    height: 150px;
  }
  /*========= RESOLUÇÃO A CIMA DE 768px ==========*/
  @media (min-width: 768px) {
    .col-a {
      text-align: left;
      align-self: center;
      grid-area: A;
    }
    .col-b {
      grid-area: B;
    }
    section#character-detail {
      width: 80vw;
      max-width: 1024px;
      height: auto;
      display: grid;
      grid-template-columns: 1fr 0.5fr;
      grid-template-areas:
      'A B'
      'C C';
    }
    section#character-detail div > h1 {
      font-size: 2.5rem;
    }
    section#character-detail div > p {
      font-size: 1.5rem;
    }
    .descricao {
      grid-area: C;
    }
  }
</style>
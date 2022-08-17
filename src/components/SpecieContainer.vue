<template>
  <section :id="`specie-container-${specie}`" class="specie-container">
    <header v-if="!isInFilter" class="d-flex">
      <h1 class="white-font">{{ specieName }}</h1>
      <hr>
    </header>
    <main class="container-fluid" :class="{'loading-container': isLoadingData}">
      <div v-if="!isLoadingData" class="row" id="scroller">
        <div v-if="!isInFilter && specieCluster.cluster.length > 0" class="col-6 col-sm-4 col-md-3" v-for="character in specieCluster.cluster">
          <RoundCharacterCard :id="character.id" :avatarPath="character.image" :name="character.name"
            :location="character.location.name" />
        </div>
        <div v-else-if="specieCluster.cluster.length < 1" id="large-spinner" class="spinner-border text-light m-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else-if="isInFilter && useStore.filteredCharacters.length > 0" class="col-6 col-sm-4 col-md-3"
          v-for="character in useStore.filteredCharacters">
          <RoundCharacterCard :id="character.id" :avatarPath="character.image" :name="character.name"
            :location="character.location.name" />
        </div>
        <span v-else class="white-font">
          {{ useStore.message }}
        </span>
      </div>
        <div v-else id="large-spinner" class="spinner-border text-light m-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
    </main>
    <footer v-if="!addingCharacters && specieCluster.nextPage" class="mt-3">
      <button v-if="!isInFilter" type="button" class="btn btn-primary" @click="addCharacters(true)" :disabled="specieCluster.cluster.length < 1">More</button>
      <button v-else-if="isInFilter && useStore.nextFilteredPage" type="button" class="btn btn-primary" @click="addCharacters(false)" :disabled="specieCluster.cluster.length < 1">More</button>
    </footer>
    <footer v-else-if="addingCharacters && specieCluster.nextPage">
      <div id="small-spinner" class="spinner-border text-light m-auto" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </footer>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import RoundCharacterCard from './RoundCharacterCard.vue';
import { useCharacterStore } from '../store/store';
import { ICharacter, ISpeciesCluster } from "../store/types";
import { onMounted } from 'vue';

const useStore = useCharacterStore() 

const props = defineProps<{
  specie: string
  isInFilter: boolean
}>()
const specieName = computed(() => { 
  const firstLetterUpperCase = props.specie.slice(0, 1)

  return `${firstLetterUpperCase.toUpperCase()}${props.specie.slice(1)}`
})

const specieCluster = computed(() => { 
  return useStore.species[props.specie as keyof ISpeciesCluster]
})

const addingCharacters = ref(false)
const emit = defineEmits(['addingCharacters', 'charactersAdded']) // definição de emits

const addCharacters = async (isNextPageForSpecie: boolean) => { // busca personagens do mesmo tipo para aumentar a página
  addingCharacters.value = true
  const query = isNextPageForSpecie ? specieCluster.value.nextPage : useStore.nextFilteredPage
  emit('addingCharacters')
  const response = await fetch(query)
  if (response.status === 200) {
    const data = await response.json()

    const extractCharacter = (data: any) => {
      const character: ICharacter = { ...data }
      useStore.$patch((state) => {
        if (!props.isInFilter) state.species[props.specie as keyof ISpeciesCluster].cluster.push(character)
        else state.filteredCharacters.push(character)
      })
    }

    if (data.results.length > 0) {
      for (const character of data.results) {
        extractCharacter(character)
      }
    }
    useStore.species[props.specie as keyof ISpeciesCluster].nextPage = data.info.next
  }
  addingCharacters.value = false
  emit('charactersAdded') // emite ao componente pai que os dados chegaram
  const scroller = document.querySelector('#scroller')!

  scroller.scrollTo({ 
    top: scroller.scrollHeight,
    left: 0,
    behavior: 'smooth'
  })
}

const isLoadingData = ref(true)
onMounted(async () => {
  isLoadingData.value = true
  if (!props.isInFilter) { // busca novas espécies sempre que o state está vazio
    if (useStore.species[props.specie as keyof ISpeciesCluster].cluster.length < 1) { //evita nova request caso state ja tenha dados
      emit('addingCharacters')
      const response = await useStore.getSpecie(specieName.value)

      if (typeof (response) === 'object') {
        useStore.species[props.specie as keyof ISpeciesCluster].nextPage = response.next
        for (const char of response.speciesArray) {
          useStore.$patch((state) => state.species[props.specie as keyof ISpeciesCluster].cluster.push(char))
        }
      }
      emit('charactersAdded')
    }
  }
  isLoadingData.value = false
})
</script>

<style scoped>
section.specie-container>header {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

section.specie-container>header>hr {
  color: white;
  width: 95%;
  height: 2px;
  opacity: 1;
}

section.specie-container>header>h1 {
  margin-right: 10px;
  font-size: 1.3rem;
}

section.specie-container>main>#scroller {
  max-height: 600px;
  height: 60vh;
  overflow-y: scroll;
}

section.specie-container>footer>button {
  width: 120px;
  border-radius: 20px;
  height: 40px;
  line-height: 20px;
  font-size: 1.2rem;
  font-family: 'Sanchez';
}

.loading-container {
  display: flex;
  height: 400px;
}
#large-spinner {
  width: 6rem;
  height: 6rem;
}
@media (min-width: 768px) {
  section.specie-container>header>h1 {
    font-size: 2rem;
  }
}
</style>
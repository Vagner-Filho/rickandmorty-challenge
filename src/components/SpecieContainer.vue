<template>
  <section :id="`specie-container-${specie}`" class="specie-container">
    <header v-if="!isInFilter" class="d-flex">
      <h1 class="white-font">{{ specieName }}</h1>
      <hr>
    </header>
    <main class="container-fluid">
      <div class="row" id="scroller">
        <div v-if="!isInFilter && specieCluster.length > 0" class="col-6 col-sm-4 col-md-3" v-for="character in specieCluster">
          <RoundCharacterCard :id="character.id" :avatarPath="character.image" :name="character.name"
            :location="character.location.name" />
        </div>
        <div v-else-if="specieCluster.length < 1" class="spinner-border text-light m-auto" role="status">
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
    </main>
    <footer v-if="!addingCharacters" class="mt-3">
      <button v-if="!isInFilter" type="button" class="btn btn-primary" @click="addCharacters(nextPage)" :disabled="specieCluster.length < 1">More</button>
      <button v-else type="button" class="btn btn-primary" @click="addCharacters(useStore.nextFilteredPage)" :disabled="specieCluster.length < 1">More</button>
    </footer>
    <footer v-else class="mt-3">
      <div class="spinner-border text-light" role="status">
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

// TODO: Refactor switch case and ifs in mounted and specieCluster
const specieCluster = computed(() => {
  return useStore.species[props.specie as keyof ISpeciesCluster]
})

const nextPage = ref('')

const addingCharacters = ref(false)
const emit = defineEmits(['addingCharacters', 'charactersAdded'])
const addCharacters = async (next: string) => {
  addingCharacters.value = true
  emit('addingCharacters')
  if (next) {
    const response = await fetch(next)
    if (response.status === 200) {
      const data = await response.json()

      const extractCharacter = (data: any) => {
        const character: ICharacter = { ...data }
        useStore.$patch((state) => {
          if (!props.isInFilter) state.species[props.specie as keyof ISpeciesCluster].push(character)
          else state.filteredCharacters.push(character)
        })
      }

      if (data.results.length > 0) {
        for (const character of data.results) {
          extractCharacter(character)
        }
      }
      if (!props.isInFilter) nextPage.value = data.info.next
      else useStore.nextFilteredPage = data.info.next
    }
  }
  addingCharacters.value = false
  emit('charactersAdded')
  const scroller = document.querySelector('#scroller')!

  scroller.scrollTo({
    top: scroller.scrollHeight,
    left: 0,
    behavior: 'smooth'
  })
}

onMounted(async () => {
  if (!props.isInFilter) {
    if (useStore.species[props.specie as keyof ISpeciesCluster].length < 1) { //evita nova request caso state ja tenha dados
      emit('addingCharacters')
      const response = await useStore.getSpecie(specieName.value)

      if (typeof (response) === 'object') { // refatorar para remover switch case
        nextPage.value = response.next
        for (const char of response.speciesArray) {
          useStore.$patch((state) => state.species[props.specie as keyof ISpeciesCluster].push(char))
        }
      }
      emit('charactersAdded')
    }
  }
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

@media (min-width: 768px) {
  section.specie-container>header>h1 {
    font-size: 2rem;
  }
}
</style>
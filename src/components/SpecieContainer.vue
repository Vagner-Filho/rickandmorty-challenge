<template>
  <section :id="`specie-container-${specie}`" class="specie-container">
    <header v-if="!isInFilter" class="d-flex">
      <h1 class="white-font">{{ specieName }}</h1>
      <hr>
    </header>
    <main class="container-fluid">
      <div class="row">
        <div v-if="!isInFilter" class="col-6 col-sm-4 col-md-3" v-for="character in specieCluster">
          <RoundCharacterCard :id="character.id" :avatarPath="character.image" :name="character.name"
            :location="character.location.name" />
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
    <footer class="mt-3">
      <!-- TODO: scroll container to indicate that new data is available -->
      <button type="button" class="btn btn-primary" @click="addCharacters(nextPage)">More</button>
    </footer>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import RoundCharacterCard from './RoundCharacterCard.vue';
import { useCharacterStore } from '../store/store';
import { ICharacter } from "../store/types";
import { onMounted } from 'vue';

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
  if (props.specie === 'human') return useStore.species.humans[0]
  if (props.specie === 'alien') return useStore.species.alien[0]
  if (props.specie === 'humanoid') return useStore.species.humanoid[0]
  if (props.specie === 'unknown') return useStore.species.unknown[0]
  if (props.specie === 'poopybutthole') return useStore.species.poopybutthole[0]
  if (props.specie === 'mythological') return useStore.species.mythological[0]
  if (props.specie === 'animal') return useStore.species.animal[0]
  if (props.specie === 'robot') return useStore.species.robot[0]
  if (props.specie === 'cronenberg') return useStore.species.cronenberg[0]
  if (props.specie === 'disease') return useStore.species.disease[0]
})

const nextPage = ref('')

const addCharacters = async (next: string) => {
  if (next) {
    const response = await fetch(next)
    if (response.status === 200) {
      const data = await response.json()

      const extractCharacter = (data: any) => {
        const character: ICharacter = { ...data }
        useStore.$patch((state) => {
          state.species[props.specie as keyof {
            humans: any[];
            alien: any[];
            humanoid: any[];
            unknown: any[];
            poopybutthole: any[];
            mythological: any[];
            animal: any[];
            robot: any[];
            cronenberg: any[];
            disease: any[];
          }]
        })
      }

      if (data.results.length > 0) {
        for (const character of data.results) {

        }
      }
    }
  }
}

const useStore = useCharacterStore()

onMounted(async () => {
  if (!props.isInFilter) {
    // TODO: continuar adicionando no array existente no store ao inves de criar novos
    const response = await useStore.getSpecie(specieName.value)

    if (typeof (response) === 'object') { // refatorar para remover switch case
      nextPage.value = response.next
      switch (specieName.value.toLowerCase()) {
        case 'human':
          useStore.$patch((state) => state.species.humans.push(response.speciesArray))
          break;
        case 'alien':
          useStore.$patch((state) => state.species.alien.push(response.speciesArray))
          break;
        case 'humanoid':
          useStore.$patch((state) => state.species.humanoid.push(response.speciesArray))
          break;
        case 'unknown':
          useStore.$patch((state) => state.species.unknown.push(response.speciesArray))
          break;
        case 'poopybutthole':
          useStore.$patch((state) => state.species.poopybutthole.push(response.speciesArray))
          break;
        case 'mythological':
          useStore.$patch((state) => state.species.mythological.push(response.speciesArray))
          break;
        case 'animal':
          useStore.$patch((state) => state.species.animal.push(response.speciesArray))
          break;
        case 'robot':
          useStore.$patch((state) => state.species.robot.push(response.speciesArray))
          break;
        case 'cronenberg':
          useStore.$patch((state) => state.species.cronenberg.push(response.speciesArray))
          break;
        case 'disease':
          useStore.$patch((state) => state.species.disease.push(response.speciesArray))
          break;
        default:
          break;
      }
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

section.specie-container>main {
  height: 60vh;
  overflow-y: auto;
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
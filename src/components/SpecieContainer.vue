<template>
  <section :id="`specie-container-${specie}`" class="specie-container">
    <header class="d-flex">
      <h1 class="white-font">{{ specieName }}</h1>
      <hr>
    </header>
    <main class="container-fluid">
      <div class="row">
        <div class="col-6 col-sm-4 col-md-3" v-for="character in useStore.species.humans[0]">
          <RoundCharacterCard 
            :id="character.id"
            :avatarPath="character.image"
            :name="character.name"
            :location="character.location.name"
          />
        </div>
      </div>
    </main>
    <footer class="mt-3">
      <!-- TODO: scroll container to indicate that new data is available -->
      <button type="button" class="btn btn-primary" @click="dummyCardCounter += 4">More</button>
    </footer>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import RoundCharacterCard from './RoundCharacterCard.vue';
import { useCharacterStore } from '../store/store';
import { onMounted } from 'vue';

const props = defineProps<{
  specie: string
}>()
const specieName = computed(() => {
  const firstLetterUpperCase = props.specie.slice(0, 1)

  return `${firstLetterUpperCase.toUpperCase()}${props.specie.slice(1)}`
})
const dummyCardCounter = ref(4)

const useStore = useCharacterStore()

onMounted(async () => {
  const humans = await useStore.getSpecie(specieName.value)
  if (humans) {
    useStore.$patch((state) => state.species.humans.push(humans))
  }
})
</script>

<style scoped>section.specie-container>header {
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
}</style>
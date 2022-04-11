<template>
  <header class="container-fluid mb-3 mt-3">
    <div class="row white-font" v-if="useStore.filtersOptions.length > 0">
      <div v-for="(filter, index) in filtersConfig" :key="index" :class="`${filter.filterClass} mt-2`">
        <select v-if="filter.name !== 'name-filter'" :name="`${filter.name}`" :id="`${filter.id}`" class="character-filter">
          <option value="" disabled selected>{{ filter.optionPlaceholder }}</option>
          <option v-for="(option, optionIndex) in useStore.filtersOptions[index - 1]" :value="option" >
            {{ option }}
          </option>
        </select>
        <input v-else type="text" :name="`${filter.name}`" :id="`${filter.id}`" :placeholder="filter.optionPlaceholder" class="character-filter">
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useCharacterStore } from '../store/store';

const useStore = useCharacterStore()
useStore.$reset()
const filtersData = reactive({
  name: '',
  status: '',
  type: '',
  gender: ''
})
const filtersConfig = reactive([
  {
    filterClass: 'col-8 col-sm-4 limit-size-300',
    name: 'name-filter',
    id: 'name-filter',
    optionPlaceholder: 'Character Name'
  },
  {
    filterClass: 'col-4 col-md-2 limit-size-200',
    name: 'status-filter',
    id: 'status-filter',
    optionPlaceholder: 'Status'
  },
  {
    filterClass: 'col-4 col-md-2 limit-size-200',
    name: 'specie-filter',
    id: 'specie-filter',
    optionPlaceholder: 'Specie'
  },
  {
    filterClass: 'col-4 col-md-2 limit-size-200',
    name: 'type-filter',
    id: 'type-filter',
    optionPlaceholder: 'Type'
  },
  {
    filterClass: 'col-4 col-md-2 limit-size-200',
    name: 'gender-filter',
    id: 'gender-filter',
    optionPlaceholder: 'Gender'
  }
])

onMounted(() => {
  if (useStore.$state.filtersOptions.length < 1) useStore.getFiltersOptions()
})
</script>

<style scoped>
.character-filter {
  border: 1px solid #e6e6e6;
  background-color: unset;
  border-radius: 25px;
  color: white;
  padding: 0 10px;
  width: 100%;
}

select.character-filter > option {
  background-color: black;
}
.confirm-filtersConfig { /* Decided to remove the button, so the requests are made when any selector changes */
  background-color: #fff;
  font-family: 'Sanchez';
  color: #000;
  border: 0;
  border-radius: 25px;
  width: 100%;
}
.limit-size-200 {
  max-width: 200px;
}
.limit-size-300 {
  max-width: 300px;
}
.white-font {
  font-size: 0.8rem;
}

@media (min-width: 768px) {
  .character-filter {
    height: 35px;
  }
  .white-font {
    font-size: 1.2rem;
  }
}
</style>
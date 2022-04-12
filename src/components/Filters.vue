<template>
  <header class="container-fluid mb-3 mt-3">
    <div class="row white-font" v-if="!loadingFilters">
    <!-- Acho que ficou muito complexo. Em uma próxima situação, farei algo mais amigável e legível -->
      <div v-for="(filter, index) in filtersConfig" :key="index" :class="`${filter.filterClass} mt-2`">
        <select v-if="filter.name !== 'name-filter'" :name="`${filter.name}`" :id="`${filter.id}`" v-model="filter.filterData.data" class="character-filter" @change="handleFiltering()">
          <option :value="null" selected>{{ filter.optionPlaceholder }}</option>
          <option v-for="(option, optionIndex) in useStore.filtersOptions[index - 1]" :value="option" :key="optionIndex">
            {{ option }}
          </option>
        </select>
        <input v-else type="text" :name="`${filter.name}`" :id="`${filter.id}`" :placeholder="filter.optionPlaceholder" v-model="filter.filterData.data" class="character-filter" @focusout="handleFiltering()">
      </div>
    </div>
    <div v-else class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import { useCharacterStore } from '../store/store';
import { getFiltersOptions } from '../../utils/functions';

const useStore = useCharacterStore()

interface IFilterConfig {
  filterClass: string
  name: string
  id: string
  optionPlaceholder: string
  filterData: {
    type: string
    data: string | null
  }
}
const filtersConfig: IFilterConfig[] = reactive([ // variável de configuração dos filtros
  {
    filterClass: 'col-8 col-sm-4 limit-size-300',
    name: 'name-filter',
    id: 'name-filter',
    optionPlaceholder: 'Character Name',
    filterData: {
      type: 'name',
      data: null
    }
  },
  {
    filterClass: 'col-4 col-md-2 limit-size-200',
    name: 'status-filter',
    id: 'status-filter',
    optionPlaceholder: 'Status',
    filterData: {
      type: 'status',
      data: null
    }
  },
  {
    filterClass: 'col-4 col-md-2 limit-size-200',
    name: 'specie-filter',
    id: 'specie-filter',
    optionPlaceholder: 'Specie',
    filterData: {
      type: 'species',
      data: null
    }
  },
  {
    filterClass: 'col-4 col-md-2 limit-size-200',
    name: 'type-filter',
    id: 'type-filter',
    optionPlaceholder: 'Type',
    filterData: {
      type: 'type',
      data: null
    }
  },
  {
    filterClass: 'col-4 col-md-2 limit-size-200',
    name: 'gender-filter',
    id: 'gender-filter',
    optionPlaceholder: 'Gender',
    filterData: {
      type: 'gender',
      data: null
    }
  }
])

const emit = defineEmits(['loadingCharacters', 'charatersLoaded'])

const handleFiltering = async () => { // trata a utilização dos filtros
  emit('loadingCharacters')
  function extractFilters(data: IFilterConfig[]) {
    const arr: { type: string, data: string | null }[] = []
    for (const filterConfig of data) {
      if (filterConfig.filterData) {
        arr.push(filterConfig.filterData)
      }
    }
    return arr;
  }
  function buildQuery(data: { type: string, data: string | null }[]) {
    let query: string = ''
    for (const filter of data) {
      if (filter.data) query += `${filter.type}=${filter.data}&`
    }
    return query
  }

  const filters = extractFilters(filtersConfig)
  const query = buildQuery(filters)
  const response = await useStore.filterCharacters(query)

  useStore.$patch((state) => state.filteredCharacters = [])
  if (typeof(response) === 'object') useStore.$patch((state) => state.filteredCharacters = response)
  if (typeof(response) === 'string') useStore.$patch((state) => state.message = response)
  emit('charatersLoaded')
}

const loadingFilters = ref(true)

onBeforeMount( async () => { // mapeia os filtros em todos os personagens existentes na api
  loadingFilters.value = true
  if (useStore.filtersOptions.length < 1) {
    const filters = await getFiltersOptions()
    for (const filter of filters) {
      useStore.$patch((state) => state.filtersOptions.push(filter))
    } 
  }
  useStore.message = "Filtre personagens!"
  loadingFilters.value = false
})
</script>

<style scoped>
.character-filter {
  border: 1px solid #e6e6e6;
  background-color: unset;
  border-radius: 25px;
  color: white;
  padding: 0 5px;
  width: 100%;
  font-size: 0.7rem;
}
select.character-filter > option {
  background-color: black;
}
.limit-size-200 {
  max-width: 200px;
}
.limit-size-300 {
  max-width: 300px;
}
.limit-size-200, .limit-size-300 {
  padding: 0 5px;
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
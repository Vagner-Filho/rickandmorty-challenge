<template>
  <header class="container-fluid">
    <div class="row white-font">
      <div v-for="(filter, index) in filters" :key="index" :class="`${filter.colClass} mt-2`">
        <select :name="`${filter.name}`" :id="`${filter.id}`" class="character-filter">
          <option value="" disabled selected>{{ filter.optionPlaceholder }}</option>
        </select>
      </div>
      <div class="col-4 offset-8 mt-2">
        <button type="button" class="confirm-filters">Confirm</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const filters = reactive([
  {
    colClass: 'col-8',
    name: 'name-filter',
    id: 'name-filter',
    optionPlaceholder: 'Character Name'
  },
  {
    colClass: 'col-4',
    name: 'status-filter',
    id: 'status-filter',
    optionPlaceholder: 'Status'
  },
  {
    colClass: 'col-4',
    name: 'specie-filter',
    id: 'specie-filter',
    optionPlaceholder: 'Specie'
  },
  {
    colClass: 'col-4',
    name: 'type-filter',
    id: 'type-filter',
    optionPlaceholder: 'Type'
  },
  {
    colClass: 'col-4',
    name: 'gender-filter',
    id: 'gender-filter',
    optionPlaceholder: 'Gender'
  }
])

</script>

<style scoped>
.character-filter {
  border: 1px solid #e6e6e6;
  background-color: unset;
  border-radius: 25px;
  color: white;
  width: 100%;
}
.confirm-filters {
  background-color: #fff;
  font-family: 'Sanchez';
  color: #000;
  border: 0;
  border-radius: 25px;
  width: 100%;
}
.white-font {
  font-size: 0.8rem;
}
</style>
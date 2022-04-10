<template>
  <button type="button" class="search-btn white-font" @click="$router.push({ name: 'FilterPage'})">Filter</button>
</template>

<script setup lang="ts">

</script>

<style scoped>
  .search-btn {
    border: 1px solid #fff;
    background-color: unset;
    border-radius: 25px;
    text-align: start;
    padding: 0 10px;
    background-image: url('/filter_icon.svg');
    font-size: 1.2rem;
    height: 30px;
    width: 120px;
    background-size: 12%;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 95px;
    margin-left: auto;
  }
</style>
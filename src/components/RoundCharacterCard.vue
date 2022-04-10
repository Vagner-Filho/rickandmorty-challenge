<template>
  <nav id="round-character-card">
    <figure @click="$router.push({ name: 'CharacterDetail', params: { id: 1 }})">
      <!-- <img src="" alt=""> -->
    </figure>
    <figcaption class="white-font">Human Human</figcaption>
    <div class="white-font">Location</div>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
  #round-character-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
  }
  #round-character-card > figure {
    width: 90px;
    height: 90px;
    border-radius: 90px;
    margin: 0;
    background-color: gray;
    border: 1px solid gainsboro;
  }
  #round-character-card > figcaption {
    font-size: 1rem;
  }
  #round-character-card > div {
    font-size: 0.8rem;
  }
  #round-character-card > figcaption, div {
    max-width: 110px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  @media (min-width: 768px) {
    #round-character-card > figcaption {
      font-size: 1.2rem;
    }
    #round-character-card div.white-font {
      font-size: 1rem;
    }
  }
</style>
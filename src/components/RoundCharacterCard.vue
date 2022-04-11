<template>
  <nav id="round-character-card">
    <figure @click="$router.push({ name: 'CharacterDetail', params: { id: id }})">
      <img :src="avatarPath" :alt="name" class="w-100">
    </figure>
    <figcaption class="white-font">{{ name }}</figcaption>
    <div class="white-font">{{ location }}</div>
  </nav>
</template>

<script setup lang="ts">

const props = defineProps<{
  id: number
  avatarPath: string
  name: string
  location: string
}>()

</script>

<style scoped>
  #round-character-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
  }
  #round-character-card > figure > img:hover {
    box-shadow: 0 0 20px #fff;
    cursor: pointer;
  }
  #round-character-card > figure {
    width: 100px;
    height: 100px;
    margin: 0;
  }
  #round-character-card > figure > img {
    border: 1px solid gainsboro;
    border-radius: 90px;
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
<template>
  <Nav/>
  <router-view />
</template>

<script setup lang="ts">
import Nav from './components/Nav.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
@font-face {
  font-family: 'Sanchez';
  src: url('/fonts/Sanchez-Regular.ttf');
}
html {
  height: 100vh;
}
body {
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 15px;
  max-width: 1440px;
  margin: 0 auto !important;
}
.white-font {
  font-family: 'Sanchez';
  color: #fff;
}

@media (max-width: 1080px) {
  body {
    background-image: url('/mobilebg.png');
    background-position-x: center;
    background-position-y: bottom;
  }
}
@media (min-width: 1080px) {
  body {
    background-image: url('/widescreenbg.png');
    background-position-x: initial;
  }
}
</style>

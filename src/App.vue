<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Heading from './components/Heading.vue'
</script>

<template>
  <header>
    <Heading title="課題" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/product">商品一覧</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  font-size: 20px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  cursor: auto;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>

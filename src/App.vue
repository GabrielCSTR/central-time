<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <header class="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div
        class="max-w-6xl mx-auto px-4 md:px-5 py-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
      >
        <router-link
          to="/"
          class="flex items-center gap-3 text-gray-800 font-bold text-lg md:text-xl transition-transform hover:scale-105"
        >
          <span class="text-3xl">⚽</span>
          <span class="gradient-text">Central do Futebol</span>
        </router-link>
        <nav class="flex gap-4 md:gap-5 items-center">
          <router-link
            to="/"
            class="text-gray-600 font-medium px-4 py-2 rounded-full transition-all hover:text-primary-500 hover:bg-primary-50"
          >
            Início
          </router-link>
          <a
            href="https://www.api-football.com/documentation-v3"
            target="_blank"
            class="text-gray-600 font-medium px-4 py-2 rounded-full transition-all hover:text-primary-500 hover:bg-primary-50"
          >
            API Docs
          </a>
        </nav>
      </div>
    </header>

    <main class="flex-1 py-5">
      <RouterView />
    </main>

    <footer class="bg-white/90 border-t border-gray-200 mt-auto">
      <div class="max-w-6xl mx-auto px-5 py-5 text-center text-gray-600">
        <p class="mb-1">
          &copy; 2024 Central do Futebol. Desenvolvido com ❤️ para os amantes do futebol!
        </p>
        <p>
          Dados fornecidos pela
          <a
            href="https://www.api-football.com/"
            target="_blank"
            class="text-primary-500 hover:underline"
            >API Football</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Estilos globais podem permanecer aqui, mas a maior parte da estilização agora está no main.css e nas classes do Tailwind */
</style>

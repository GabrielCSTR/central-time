<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col bg-secondary-100">
    <header class="bg-white/80 backdrop-blur-md border-b border-secondary-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <router-link
          to="/"
          class="flex items-center gap-3 text-secondary-800 font-bold text-xl transition-transform hover:scale-105"
        >
          <span class="text-3xl">⚽</span>
          <span
            class="bg-gradient-to-r from-primary-600 to-primary-400 text-transparent bg-clip-text"
            >Central do Futebol</span
          >
        </router-link>
        <nav class="flex gap-2 items-center">
          <router-link
            to="/"
            class="text-secondary-600 font-medium px-4 py-2 rounded-lg transition-all hover:text-accent-600 hover:bg-accent-100"
          >
            Início
          </router-link>
          <a
            href="https://www.api-football.com/documentation-v3"
            target="_blank"
            class="text-secondary-600 font-medium px-4 py-2 rounded-lg transition-all hover:text-accent-600 hover:bg-accent-100"
          >
            API Docs
          </a>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="bg-white border-t border-secondary-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-secondary-600">
        <p class="mb-2">
          &copy; 2024 Central do Futebol. Desenvolvido com ❤️ para os amantes do futebol!
        </p>
        <p>
          Dados fornecidos pela
          <a
            href="https://www.api-football.com/"
            target="_blank"
            class="font-semibold text-primary-600 hover:text-primary-500 transition-colors"
            >API Football</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

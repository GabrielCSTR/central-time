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
          <img src="/favicon.svg" alt="Central Time Logo" class="w-8 h-8" />
          <span
            class="bg-gradient-to-r from-primary-600 to-primary-400 text-transparent bg-clip-text uppercase"
            >Central Time</span
          >
        </router-link>
        <nav class="flex gap-2 items-center">
          <router-link
            to="/"
            class="text-secondary-600 font-medium px-4 py-2 rounded-lg transition-all hover:text-accent-600 hover:bg-accent-100"
          >
            Início
          </router-link>
          <router-link
            to="/api-demo"
            class="text-secondary-600 font-medium px-4 py-2 rounded-lg transition-all hover:text-accent-600 hover:bg-accent-100"
          >
            Demonstração da API
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="bg-secondary-900 text-white py-12 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Central Time</h3>
            <p class="text-secondary-300 mb-4">
              Aplicação demonstrativa de dados de futebol brasileiro, construída com Vue.js e
              TypeScript.
            </p>
            <div class="flex space-x-4">
              <a
                href="https://github.com"
                class="text-secondary-400 hover:text-white transition-colors"
              >
                <span class="sr-only">GitHub</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold mb-4">API SportMetrics</h3>
            <p class="text-secondary-300 mb-4">
              A API brasileira mais completa para dados de futebol. Gratuita para começar, com
              planos escaláveis.
            </p>
            <div class="space-y-2">
              <a
                href="https://sportmetrics.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center text-accent-400 hover:text-accent-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 01-9-9m9-9a9 9 0 00-9-9"
                  />
                </svg>
                Acessar API SportMetrics
              </a>
              <a
                href="/api-demo"
                class="flex items-center text-accent-400 hover:text-accent-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v11.494M12 6.253L6.26 4.847M12 6.253L17.74 7.66M6.26 4.847l-3.027 1.25m3.027-1.25L6.26 2.347M17.74 7.66l2.817 6.947M17.74 7.66L20.557 4.847m-8.297 12.9L6.26 14.933m5.74 1.414L17.74 14.933M6.26 14.933l-3.027-1.25m3.027 1.25L6.26 17.653m11.48-2.72L20.557 18.92m-8.297-4.27L12 17.653"
                  />
                </svg>
                Ver Demonstração
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="/"
                  class="flex items-center text-secondary-300 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Página Inicial
                </a>
              </li>
              <li>
                <a
                  href="/api-demo"
                  class="flex items-center text-secondary-300 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 01-2.56 5.84m-2.28 2.28a6 6 0 01-7.38-5.84m2.56-5.84a6 6 0 015.84-2.56m-2.28-2.28a6 6 0 01-7.38 5.84m9.94-9.94L9.5 9.5M19 5l-4.5 4.5"
                    />
                  </svg>
                  Demonstração da API
                </a>
              </li>
              <li>
                <a
                  href="https://sportmetrics.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center text-secondary-300 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 3.75V16.5m-1.875-1.875l-1.875 1.875m1.875-1.875L12.75 6l-1.875 1.875m3.75 3.75L12 12.375m-3.75-3.75L6 12.375m3.75-3.75L7.875 6M6.375 16.5h11.25"
                    />
                  </svg>
                  Documentação
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-secondary-700 mt-8 pt-8 text-center">
          <p class="flex items-center justify-center text-secondary-400">
            © 2024 Central Time. Desenvolvido com
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mx-1 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            para demonstrar a
            <a
              href="https://sportmetrics.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-400 hover:text-accent-300 ml-1"
            >
              API SportMetrics
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

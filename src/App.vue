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
                class="block text-accent-400 hover:text-accent-300 transition-colors"
              >
                🌐 Acessar API SportMetrics
              </a>
              <a
                href="/api-demo"
                class="block text-accent-400 hover:text-accent-300 transition-colors"
              >
                📚 Ver Demonstração
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul class="space-y-2">
              <li>
                <a href="/" class="text-secondary-300 hover:text-white transition-colors">
                  🏠 Página Inicial
                </a>
              </li>
              <li>
                <a href="/api-demo" class="text-secondary-300 hover:text-white transition-colors">
                  🚀 Demonstração da API
                </a>
              </li>
              <li>
                <a
                  href="https://sportmetrics.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-secondary-300 hover:text-white transition-colors"
                >
                  📖 Documentação
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-secondary-700 mt-8 pt-8 text-center">
          <p class="text-secondary-400">
            © 2024 Central Time. Desenvolvido com ❤️ para demonstrar a
            <a
              href="https://sportmetrics.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-400 hover:text-accent-300"
            >
              API SportMetrics
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

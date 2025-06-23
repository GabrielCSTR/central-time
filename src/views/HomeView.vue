<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import stadiumBg from '@/assets/stadium-bg.jpg'

const router = useRouter()
const searchTerm = ref('')
const isSearching = ref(false)

const popularTeams = [
  { name: 'Palmeiras', logo: 'https://cdn.sportmetrics.com.br/football/teams/121.png' },
  { name: 'Flamengo', logo: 'https://cdn.sportmetrics.com.br/football/teams/127.png' },
  { name: 'Corinthians', logo: 'https://cdn.sportmetrics.com.br/football/teams/131.png' },
  { name: 'São Paulo', logo: 'https://cdn.sportmetrics.com.br/football/teams/126.png' },
  { name: 'Santos', logo: 'https://cdn.sportmetrics.com.br/football/teams/128.png' },
  { name: 'Grêmio', logo: 'https://cdn.sportmetrics.com.br/football/teams/130.png' },
  { name: 'Internacional', logo: 'https://cdn.sportmetrics.com.br/football/teams/119.png' },
  { name: 'Atlético Mineiro', logo: 'https://cdn.sportmetrics.com.br/football/teams/12952.png' },
]

const searchTeam = () => {
  if (searchTerm.value.trim()) {
    isSearching.value = true
    router.push(`/time/${encodeURIComponent(searchTerm.value.trim())}`)
  }
}

const selectTeam = (teamName: string) => {
  searchTerm.value = teamName
  searchTeam()
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    searchTeam()
  }
}

const goToApiDemo = () => {
  router.push('/api-demo')
}
</script>

<template>
  <div class="bg-secondary-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <!-- Hero Section -->
      <div
        class="relative text-center py-20 sm:py-24 md:py-32 px-4 sm:px-6 rounded-3xl overflow-hidden mb-16"
      >
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${stadiumBg})` }"
        ></div>
        <div class="absolute inset-0 bg-secondary-900 bg-opacity-60"></div>

        <div class="relative max-w-4xl mx-auto">
          <h1
            class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight text-shadow-lg"
          >
            <span class="block">Central do Futebol</span>
          </h1>
          <p
            class="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-secondary-200 max-w-2xl mx-auto"
          >
            Descubra informações completas sobre qualquer time de futebol
          </p>

          <div class="mt-10 max-w-xl mx-auto">
            <div
              class="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-2xl border border-white/20"
            >
              <input
                v-model="searchTerm"
                @keypress="handleKeyPress"
                type="text"
                placeholder="Digite o nome do time..."
                class="flex-1 px-5 py-3 text-lg rounded-xl outline-none bg-white/90 text-secondary-900 placeholder-secondary-500 focus:ring-2 focus:ring-accent-400 transition"
                :disabled="isSearching"
              />
              <button
                @click="searchTeam"
                class="btn-accent min-w-[140px] disabled:opacity-70 disabled:cursor-not-allowed"
                :disabled="isSearching || !searchTerm.trim()"
              >
                <span v-if="!isSearching">Buscar</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <div
                    class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  ></div>
                  Buscando...
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Teams Section -->
      <div class="text-center mb-20">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-800 mb-4">
          Times Populares
        </h2>
        <p class="text-lg md:text-xl text-secondary-600 mb-12">
          Clique em um time para ver suas informações
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-5">
          <div
            v-for="team in popularTeams"
            :key="team.name"
            @click="selectTeam(team.name)"
            class="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div
              class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-accent-500/30 group-hover:scale-110 group-hover:-translate-y-1 border-2 border-transparent group-hover:border-accent-400"
            >
              <img
                :src="team.logo"
                :alt="`Logo do ${team.name}`"
                class="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 class="text-base font-semibold text-secondary-700 group-hover:text-accent-600">
              {{ team.name }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="text-center py-16 px-4 sm:px-6 bg-white rounded-3xl shadow-xl mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-800 mb-12">
          O que você encontra aqui?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div class="card-feature">
            <div class="card-feature-icon bg-primary-100 text-primary-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-12 h-12"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 18v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12" />
                <path d="M4 12h16" />
                <path d="M4 9h16" />
                <path d="M8 21l4 -12l4 12" />
              </svg>
            </div>
            <h3 class="card-feature-title">Informações do Estádio</h3>
            <p class="card-feature-description">
              Capacidade, localização e fotos do estádio do time
            </p>
          </div>
          <div class="card-feature">
            <div class="card-feature-icon bg-accent-100 text-accent-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
            </div>
            <h3 class="card-feature-title">Estatísticas</h3>
            <p class="card-feature-description">
              Dados da temporada atual, vitórias, empates e derrotas
            </p>
          </div>
          <div class="card-feature">
            <div class="card-feature-icon bg-primary-100 text-primary-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-12 h-12"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7l4.76 2.75l-.005 5.5l-4.755 2.75l-4.755 -2.75l.005 -5.5z" />
                <path d="M12 7v-4" />
                <path d="M16.76 9.75l3.44 -2" />
                <path d="M16.76 15.25l3.44 2" />
                <path d="M7.24 15.25l-3.44 2" />
                <path d="M7.24 9.75l-3.44 -2" />
              </svg>
            </div>
            <h3 class="card-feature-title">Jogadores</h3>
            <p class="card-feature-description">Elenco atual com posições e nacionalidades</p>
          </div>
          <div class="card-feature">
            <div class="card-feature-icon bg-accent-100 text-accent-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-12 h-12"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <line x1="7" y1="4" x2="17" y2="4" />
                <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
                <circle cx="5" cy="9" r="2" />
                <circle cx="19" cy="9" r="2" />
              </svg>
            </div>
            <h3 class="card-feature-title">História</h3>
            <p class="card-feature-description">
              Ano de fundação e informações históricas do clube
            </p>
          </div>
        </div>

        <!-- API Demo CTA -->
        <div class="mt-12 pt-8 border-t border-secondary-200">
          <h3 class="text-2xl font-bold text-secondary-800 mb-4">Conheça a API SportMetrics</h3>
          <p class="text-lg text-secondary-600 mb-6">
            Esta aplicação é alimentada pela API SportMetrics - a API brasileira mais completa para
            dados de futebol
          </p>
          <button
            @click="goToApiDemo"
            class="btn-accent text-lg px-8 py-4 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 mr-3"
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
            Ver Demonstração da API
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-shadow-lg {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.btn-accent {
  @apply btn-primary bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300;
  box-shadow: 0 4px 20px theme('colors.accent.500 / 40%');
}

.btn-accent:hover {
  box-shadow: 0 6px 25px theme('colors.accent.500 / 50%');
  transform: translateY(-2px);
}

.card-feature {
  @apply bg-secondary-100 rounded-2xl p-8 text-center transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2;
}

.card-feature-icon {
  @apply w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-6;
}

.card-feature-title {
  @apply text-xl font-bold text-secondary-800 mb-3;
}

.card-feature-description {
  @apply text-secondary-600;
}
</style>

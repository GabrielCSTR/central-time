<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
          style="background-image: url('/src/assets/stadium-bg.jpg')"
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
            <div class="card-feature-icon bg-primary-100 text-primary-600">🏟️</div>
            <h3 class="card-feature-title">Informações do Estádio</h3>
            <p class="card-feature-description">
              Capacidade, localização e fotos do estádio do time
            </p>
          </div>
          <div class="card-feature">
            <div class="card-feature-icon bg-accent-100 text-accent-600">📊</div>
            <h3 class="card-feature-title">Estatísticas</h3>
            <p class="card-feature-description">
              Dados da temporada atual, vitórias, empates e derrotas
            </p>
          </div>
          <div class="card-feature">
            <div class="card-feature-icon bg-primary-100 text-primary-600">⚽</div>
            <h3 class="card-feature-title">Jogadores</h3>
            <p class="card-feature-description">Elenco atual com posições e nacionalidades</p>
          </div>
          <div class="card-feature">
            <div class="card-feature-icon bg-accent-100 text-accent-600">🏆</div>
            <h3 class="card-feature-title">História</h3>
            <p class="card-feature-description">
              Ano de fundação e informações históricas do clube
            </p>
          </div>
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

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchTerm = ref('')
const isSearching = ref(false)

const popularTeams = [
  { name: 'Palmeiras', logo: 'https://media.api-sports.io/football/teams/1963.png' },
  { name: 'Flamengo', logo: 'https://media.api-sports.io/football/teams/5981.png' },
  { name: 'Corinthians', logo: 'https://media.api-sports.io/football/teams/1957.png' },
  { name: 'São Paulo', logo: 'https://media.api-sports.io/football/teams/1970.png' },
  { name: 'Santos', logo: 'https://media.api-sports.io/football/teams/1968.png' },
  { name: 'Grêmio', logo: 'https://media.api-sports.io/football/teams/5926.png' },
  { name: 'Internacional', logo: 'https://media.api-sports.io/football/teams/1960.png' },
  { name: 'Atlético Mineiro', logo: 'https://media.api-sports.io/football/teams/1977.png' },
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
  <div class="max-w-6xl mx-auto px-5">
    <!-- Hero Section -->
    <div
      class="text-center py-16 px-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-3xl mb-16"
    >
      <h1 class="text-4xl md:text-6xl font-bold mb-5 text-shadow-lg">Central do Futebol</h1>
      <p class="text-lg md:text-2xl mb-10 opacity-90">
        Descubra informações completas sobre qualquer time de futebol
      </p>

      <div class="max-w-2xl mx-auto">
        <div
          class="flex flex-col md:flex-row gap-3 bg-white rounded-xl md:rounded-full p-2 shadow-2xl"
        >
          <input
            v-model="searchTerm"
            @keypress="handleKeyPress"
            type="text"
            placeholder="Digite o nome do time..."
            class="flex-1 px-6 py-4 text-lg rounded-xl md:rounded-full outline-none text-gray-800 focus:ring-2 focus:ring-primary-300"
            :disabled="isSearching"
          />
          <button
            @click="searchTeam"
            class="btn-primary min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="isSearching || !searchTerm.trim()"
          >
            <span v-if="!isSearching">Buscar</span>
            <span v-else class="flex items-center justify-center gap-2">
              <div
                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
              Buscando...
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Popular Teams Section -->
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-5xl font-bold text-gray-800 mb-3">Times Populares</h2>
      <p class="text-lg md:text-xl text-gray-600 mb-10">
        Clique em um time para ver suas informações
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div
          v-for="team in popularTeams"
          :key="team.name"
          @click="selectTeam(team.name)"
          class="card p-6 cursor-pointer border-2 border-transparent hover:border-primary-500 hover:-translate-y-2"
        >
          <img
            :src="team.logo"
            :alt="`Logo do ${team.name}`"
            class="w-20 h-20 mx-auto mb-4 object-contain"
          />
          <h3 class="text-lg font-semibold text-gray-800">{{ team.name }}</h3>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-5xl font-bold text-gray-800 mb-10">O que você encontra aqui?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="card p-8 hover:-translate-y-2">
          <div class="text-5xl mb-6">🏟️</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Informações do Estádio</h3>
          <p class="text-gray-600 leading-relaxed">
            Capacidade, localização e fotos do estádio do time
          </p>
        </div>
        <div class="card p-8 hover:-translate-y-2">
          <div class="text-5xl mb-6">📊</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Estatísticas</h3>
          <p class="text-gray-600 leading-relaxed">
            Dados da temporada atual, vitórias, empates e derrotas
          </p>
        </div>
        <div class="card p-8 hover:-translate-y-2">
          <div class="text-5xl mb-6">⚽</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Jogadores</h3>
          <p class="text-gray-600 leading-relaxed">Elenco atual com posições e nacionalidades</p>
        </div>
        <div class="card p-8 hover:-translate-y-2">
          <div class="text-5xl mb-6">🏆</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">História</h3>
          <p class="text-gray-600 leading-relaxed">
            Ano de fundação e informações históricas do clube
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>

<script lang="ts" setup>
import type { TeamData } from '@/interfaces'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { API_ENDPOINTS } from '@/config/api'

const teamData = ref<TeamData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const route = useRoute()

onMounted(async () => {
  const teamName = route.params.nomeDoTime as string

  try {
    const response = await fetch(API_ENDPOINTS.team(teamName))
    if (!response.ok) {
      throw new Error('Time não encontrado ou erro no servidor.')
    }
    const data = await response.json()
    teamData.value = data
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
    error.value = errorMessage
  } finally {
    loading.value = false
  }
})

const getResultClass = (result: string) => {
  switch (result.toLowerCase()) {
    case 'w':
      return 'bg-green-500 text-green-50'
    case 'd':
      return 'bg-yellow-500 text-yellow-50'
    case 'l':
      return 'bg-red-500 text-red-50'
    default:
      return 'bg-gray-300 text-gray-800'
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-[calc(100vh-150px)]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 h-full">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center h-full text-center py-20"
      >
        <img src="/favicon.svg" alt="Loading..." class="w-16 h-16 animate-spin mb-6" />
        <p class="text-xl text-gray-600">
          Carregando informações sobre
          <span class="font-bold text-primary-600">{{ route.params.nomeDoTime }}</span
          >...
        </p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center h-full text-center py-20"
      >
        <div class="bg-white p-10 rounded-lg shadow-md max-w-md mx-auto">
          <h2 class="text-3xl font-bold text-red-600 mb-4">Erro ao Carregar Time</h2>
          <p class="text-gray-600 mb-8">{{ error }}</p>
          <router-link
            to="/"
            class="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >Voltar ao início</router-link
          >
        </div>
      </div>

      <!-- Team Data -->
      <div v-else-if="teamData" class="space-y-8 pt-8">
        <!-- Team Header -->
        <div>
          <div class="relative">
            <div class="bg-gradient-to-r from-gray-800 to-gray-900 h-40 rounded-lg shadow-lg"></div>
            <div class="absolute -bottom-14 left-1/2 -translate-x-1/2">
              <img
                :src="teamData.team.logo"
                :alt="`Escudo do ${teamData.team.name}`"
                class="w-28 h-28 object-contain bg-white rounded-full p-2 shadow-xl border-4 border-gray-50"
              />
            </div>
          </div>
          <div class="text-center pt-16">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800">
              {{ teamData.team.name }}
            </h1>
            <p class="text-md text-gray-500">
              {{ teamData.team.country }} - Fundado em {{ teamData.team.founded }}
            </p>
          </div>
        </div>

        <!-- Venue Section -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Estádio</h2>
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <img
                :src="teamData.venue.image"
                :alt="`Foto do ${teamData.venue.name}`"
                class="w-full md:w-1/2 h-60 object-cover rounded-lg shadow-sm"
              />
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-800 mb-3">{{ teamData.venue.name }}</h3>
                <div class="space-y-2 text-gray-600">
                  <p><span class="font-semibold">Cidade:</span> {{ teamData.venue.city }}</p>
                  <p>
                    <span class="font-semibold">Capacidade:</span>
                    {{ teamData.venue.capacity.toLocaleString() }}
                  </p>
                  <p>
                    <span class="font-semibold">Superfície:</span>
                    <span class="capitalize">{{ teamData.venue.surface }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Section -->
        <div v-if="teamData.statistics" class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Desempenho na Temporada</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- General Stats -->
            <div class="space-y-6">
              <div class="p-4 rounded-lg bg-gray-50 border">
                <h3 class="font-bold text-lg mb-2 text-gray-700">
                  {{ teamData.statistics.league }} {{ teamData.statistics.season }}
                </h3>
                <div class="flex justify-center gap-1.5 mt-4">
                  <span
                    v-for="(result, index) in teamData.statistics.form?.slice(-12)"
                    :key="index"
                    :class="[
                      'w-full h-full rounded-full flex items-center justify-center text-xs font-bold',
                      getResultClass(result),
                    ]"
                    :title="result === 'W' ? 'Vitória' : result === 'D' ? 'Empate' : 'Derrota'"
                  >
                    {{ result }}
                  </span>
                </div>
              </div>
              <div class="p-4 rounded-lg bg-gray-50 border">
                <h3 class="font-bold text-lg mb-3 text-gray-700">Gols</h3>
                <div class="flex justify-around">
                  <div class="text-center">
                    <p class="text-3xl font-bold text-green-600">
                      {{ teamData.statistics.goals.for.total.total }}
                    </p>
                    <p class="text-sm text-gray-600">Marcados</p>
                    <p class="text-xs text-gray-500">
                      ({{ teamData.statistics.goals.for.media.total }} / jogo)
                    </p>
                  </div>
                  <div class="text-center">
                    <p class="text-3xl font-bold text-red-600">
                      {{ teamData.statistics.goals.against.total.total }}
                    </p>
                    <p class="text-sm text-gray-600">Sofridos</p>
                    <p class="text-xs text-gray-500">
                      ({{ teamData.statistics.goals.against.media.total }} / jogo)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fixtures -->
            <div class="p-4 rounded-lg bg-gray-50 border space-y-4">
              <h3 class="font-bold text-lg text-gray-700 text-center">
                Jogos ({{ teamData.statistics.fixtures.played.total }})
              </h3>
              <!-- Wins -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-semibold text-green-600">Vitórias</span>
                  <span class="text-sm font-bold text-green-600">{{
                    teamData.statistics.fixtures.wins.total
                  }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-green-500 h-2.5 rounded-full"
                    :style="{
                      width:
                        (teamData.statistics.fixtures.wins.total /
                          teamData.statistics.fixtures.played.total) *
                          100 +
                        '%',
                    }"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 flex justify-between mt-1">
                  <span>Casa: {{ teamData.statistics.fixtures.wins.casa }}</span>
                  <span>Fora: {{ teamData.statistics.fixtures.wins.fora }}</span>
                </div>
              </div>
              <!-- Draws -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-semibold text-yellow-600">Empates</span>
                  <span class="text-sm font-bold text-yellow-600">{{
                    teamData.statistics.fixtures.draws.total
                  }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-yellow-500 h-2.5 rounded-full"
                    :style="{
                      width:
                        (teamData.statistics.fixtures.draws.total /
                          teamData.statistics.fixtures.played.total) *
                          100 +
                        '%',
                    }"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 flex justify-between mt-1">
                  <span>Casa: {{ teamData.statistics.fixtures.draws.casa }}</span>
                  <span>Fora: {{ teamData.statistics.fixtures.draws.fora }}</span>
                </div>
              </div>
              <!-- Loses -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-semibold text-red-600">Derrotas</span>
                  <span class="text-sm font-bold text-red-600">{{
                    teamData.statistics.fixtures.loses.total
                  }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-red-500 h-2.5 rounded-full"
                    :style="{
                      width:
                        (teamData.statistics.fixtures.loses.total /
                          teamData.statistics.fixtures.played.total) *
                          100 +
                        '%',
                    }"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 flex justify-between mt-1">
                  <span>Casa: {{ teamData.statistics.fixtures.loses.casa }}</span>
                  <span>Fora: {{ teamData.statistics.fixtures.loses.fora }}</span>
                </div>
              </div>
            </div>

            <!-- Goals by minute -->
            <div class="p-4 rounded-lg bg-gray-50 border">
              <h3 class="font-bold text-lg text-gray-700 text-center mb-4">Gols por Período</h3>
              <div class="space-y-3">
                <div
                  v-for="(period, name) in teamData.statistics.goals.for.minutos"
                  :key="name"
                  class="grid grid-cols-3 items-center gap-2 text-xs"
                >
                  <span class="text-gray-600 font-semibold text-right">{{ name }}'</span>
                  <div class="w-full bg-gray-200 rounded-full h-4">
                    <div
                      class="bg-blue-500 h-4 rounded-full text-white text-xxs flex items-center justify-center"
                      :style="{ width: period.porcentagem || '0%' }"
                    >
                      <span v-if="period.total">{{ period.total }}</span>
                    </div>
                  </div>
                  <span class="text-gray-500">{{ period.porcentagem || '0%' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Fixtures Section -->
        <div v-if="teamData.upcoming_fixtures" class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Próximos Jogos</h2>
          <div class="space-y-6">
            <div
              v-for="fixture in teamData.upcoming_fixtures"
              :key="fixture.id"
              class="bg-gray-50 border rounded-xl p-4 transition-shadow hover:shadow-lg"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <img :src="fixture.liga.logo" :alt="fixture.liga.nome" class="w-6 h-6" />
                  <div>
                    <p class="font-bold text-gray-700">{{ fixture.liga.nome }}</p>
                    <p class="text-xs text-gray-500">{{ fixture.liga.rodada }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-sm text-gray-800">{{ fixture.data.formatada }}</p>
                  <p class="text-xs text-gray-500">{{ fixture.estadio.nome }}</p>
                </div>
              </div>
              <div class="flex items-center justify-center gap-4 py-4">
                <div class="flex-1 text-center">
                  <img
                    :src="fixture.times.mandante.logo"
                    :alt="fixture.times.mandante.nome"
                    class="w-12 h-12 mx-auto mb-2"
                  />
                  <p class="font-semibold text-lg">{{ fixture.times.mandante.nome }}</p>
                </div>
                <div class="flex flex-col items-center justify-center min-w-[80px]">
                  <div class="text-2xl font-bold text-gray-800">
                    {{ fixture.placar.mandante }}
                    <span class="text-gray-400">x</span>
                    {{ fixture.placar.visitante }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">{{ fixture.status.longo }}</div>
                </div>
                <div class="flex-1 text-center">
                  <img
                    :src="fixture.times.visitante.logo"
                    :alt="fixture.times.visitante.nome"
                    class="w-12 h-12 mx-auto mb-2"
                  />
                  <p class="font-semibold text-lg">{{ fixture.times.visitante.nome }}</p>
                </div>
              </div>
              <div
                class="flex flex-wrap justify-between items-center text-xs text-gray-500 mt-2 gap-2"
              >
                <div><span class="font-semibold">Árbitro:</span> {{ fixture.arbitro }}</div>
                <div><span class="font-semibold">Cidade:</span> {{ fixture.estadio.cidade }}</div>
                <div><span class="font-semibold">Status:</span> {{ fixture.status.curto }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Players Section -->
        <div
          v-if="teamData.players && teamData.players.length > 0"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Elenco Principal</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              v-for="player in teamData.players"
              :key="player.jogador.id"
              class="bg-gray-50 rounded-lg p-4 flex gap-4 items-center border hover:shadow-lg transition-shadow"
            >
              <img
                :src="player.jogador.foto"
                :alt="player.jogador.nome"
                class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 flex-shrink-0"
              />
              <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-900">{{ player.jogador.nome }}</h3>
                <p
                  v-if="player.estatisticas.length > 0"
                  class="text-sm text-blue-600 font-semibold"
                >
                  {{ player.estatisticas[0].jogos.posicao }}
                </p>
                <div class="text-xs text-gray-600 mt-2 space-y-1">
                  <p><span class="font-semibold">Idade:</span> {{ player.jogador.idade }} anos</p>
                  <p v-if="player.jogador.altura && player.jogador.peso">
                    <span class="font-semibold">Altura:</span> {{ player.jogador.altura }} |
                    <span class="font-semibold">Peso:</span> {{ player.jogador.peso }}
                  </p>
                  <div v-if="player.estatisticas.length > 0" class="border-t mt-2 pt-2">
                    <p>
                      <span class="font-semibold">Jogos:</span>
                      {{ player.estatisticas[0].jogos.aparicoes || 0 }}
                    </p>
                    <p>
                      <span class="font-semibold">Gols:</span>
                      {{ player.estatisticas[0].gols.total || 0 }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <div class="text-center pt-4">
          <router-link
            to="/"
            class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >Buscar outro time</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
  line-height: 1;
}
</style>

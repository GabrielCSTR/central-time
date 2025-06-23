<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('overview')

const apiFeatures = [
  {
    icon: '⚽',
    title: 'Dados de Times',
    description: 'Informações completas, logos, história e estatísticas dos clubes brasileiros',
    endpoint: 'GET /api/v1/times/{teamName}',
  },
  {
    icon: '📊',
    title: 'Estatísticas',
    description: 'Performance, vitórias, empates, derrotas e gols marcados/sofridos',
    endpoint: 'GET /api/v1/times/estatisticas',
  },
  {
    icon: '👥',
    title: 'Jogadores',
    description: 'Elenco atual com estatísticas individuais e posições',
    endpoint: 'GET /api/v1/jogador/estatisticas',
  },
  {
    icon: '🏟️',
    title: 'Estádios',
    description: 'Capacidade, localização, fotos e informações dos estádios',
    endpoint: 'Incluído nos dados do time',
  },
  {
    icon: '🏆',
    title: 'Competições',
    description: 'Brasileirão, Copa do Brasil, Libertadores e outras competições',
    endpoint: 'GET /api/v1/competicoes',
  },
  {
    icon: '📈',
    title: 'Histórico',
    description: 'Dados históricos e temporadas anteriores',
    endpoint: 'GET /api/v1/times/historico',
  },
]

const pricingPlans = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    requests: '100/dia',
    features: [
      'Dados básicos de times',
      'Estatísticas simples',
      'Acesso a jogadores',
      'Suporte por email',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: 'R$ 49',
    requests: '1.000/dia',
    features: [
      'Todas as funcionalidades gratuitas',
      'Dados históricos',
      'Estatísticas avançadas',
      'Suporte prioritário',
      'Webhooks',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    requests: 'Ilimitado',
    features: [
      'Todas as funcionalidades Pro',
      'Dados em tempo real',
      'Suporte 24/7',
      'API dedicada',
      'Consultoria personalizada',
    ],
    popular: false,
  },
]

const codeExamples = [
  {
    language: 'JavaScript',
    title: 'Buscar dados de um time',
    code: `const response = await fetch('https://api.sportmetrics.com.br/api/v1/times/palmeiras', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const teamData = await response.json();`,
  },
  {
    language: 'Python',
    title: 'Obter estatísticas',
    code: `import requests

url = 'https://api.sportmetrics.com.br/api/v1/times/estatisticas'
params = {
    'time_id': 121,
    'competicao_id': 71,
    'temporada': 2024
}
headers = {'Authorization': 'Bearer YOUR_API_KEY'}

response = requests.get(url, params=params, headers=headers)
stats = response.json()`,
  },
  {
    language: 'cURL',
    title: 'Listar jogadores',
    code: `curl -X GET "https://api.sportmetrics.com.br/api/v1/jogador/estatisticas?time_id=121&competicao_id=71&temporada=2024" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
]

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-secondary-50 to-accent-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <button
              @click="goToHome"
              class="text-secondary-600 hover:text-accent-600 transition-colors"
            >
              ← Voltar ao Central Time
            </button>
          </div>
          <div class="flex items-center space-x-4">
            <a
              href="https://sportmetrics.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
            >
              Acessar API
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-bold text-secondary-800 mb-6">API SportMetrics</h1>
        <p class="text-xl md:text-2xl text-secondary-600 mb-8 max-w-3xl mx-auto">
          A API brasileira mais completa para dados de futebol.
          <span class="text-accent-600 font-semibold">100% gratuita</span> para começar.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://sportmetrics.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-accent text-lg px-8 py-4"
          >
            🚀 Começar Agora
          </a>
          <a href="#documentation" class="btn-secondary text-lg px-8 py-4"> 📚 Ver Documentação </a>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center mb-12">
        <div class="flex bg-white rounded-xl p-1 shadow-lg">
          <button
            @click="activeTab = 'overview'"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all',
              activeTab === 'overview'
                ? 'bg-accent-500 text-white shadow-md'
                : 'text-secondary-600 hover:text-accent-600',
            ]"
          >
            Visão Geral
          </button>
          <button
            @click="activeTab = 'features'"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all',
              activeTab === 'features'
                ? 'bg-accent-500 text-white shadow-md'
                : 'text-secondary-600 hover:text-accent-600',
            ]"
          >
            Funcionalidades
          </button>
          <button
            @click="activeTab = 'pricing'"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all',
              activeTab === 'pricing'
                ? 'bg-accent-500 text-white shadow-md'
                : 'text-secondary-600 hover:text-accent-600',
            ]"
          >
            Preços
          </button>
          <button
            @click="activeTab = 'code'"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all',
              activeTab === 'code'
                ? 'bg-accent-500 text-white shadow-md'
                : 'text-secondary-600 hover:text-accent-600',
            ]"
          >
            Exemplos de Código
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="bg-white rounded-3xl shadow-xl p-8">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="space-y-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-secondary-800 mb-4">
              Por que escolher a API SportMetrics?
            </h2>
            <p class="text-lg text-secondary-600 max-w-2xl mx-auto">
              A API mais completa e confiável para dados de futebol brasileiro, com atualizações em
              tempo real e documentação clara.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div class="text-center">
              <div
                class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-2xl">⚡</span>
              </div>
              <h3 class="text-xl font-bold text-secondary-800 mb-2">Rápida</h3>
              <p class="text-secondary-600">Resposta em menos de 200ms para todas as requisições</p>
            </div>
            <div class="text-center">
              <div
                class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-2xl">🔄</span>
              </div>
              <h3 class="text-xl font-bold text-secondary-800 mb-2">Atualizada</h3>
              <p class="text-secondary-600">Dados atualizados em tempo real durante as partidas</p>
            </div>
            <div class="text-center">
              <div
                class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-2xl">🇧🇷</span>
              </div>
              <h3 class="text-xl font-bold text-secondary-800 mb-2">Brasileira</h3>
              <p class="text-secondary-600">
                Focada no futebol brasileiro com dados locais precisos
              </p>
            </div>
          </div>
        </div>

        <!-- Features Tab -->
        <div v-if="activeTab === 'features'" class="space-y-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-secondary-800 mb-4">Funcionalidades da API</h2>
            <p class="text-lg text-secondary-600">
              Tudo que você precisa para criar aplicações incríveis de futebol
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="feature in apiFeatures"
              :key="feature.title"
              class="bg-secondary-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div class="text-3xl mb-4">{{ feature.icon }}</div>
              <h3 class="text-xl font-bold text-secondary-800 mb-2">{{ feature.title }}</h3>
              <p class="text-secondary-600 mb-4">{{ feature.description }}</p>
              <code class="text-sm bg-white px-3 py-1 rounded-lg text-accent-600 font-mono">
                {{ feature.endpoint }}
              </code>
            </div>
          </div>
        </div>

        <!-- Pricing Tab -->
        <div v-if="activeTab === 'pricing'" class="space-y-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-secondary-800 mb-4">Planos e Preços</h2>
            <p class="text-lg text-secondary-600">Escolha o plano ideal para seu projeto</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="plan in pricingPlans"
              :key="plan.name"
              :class="[
                'relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl',
                plan.popular
                  ? 'border-accent-500 shadow-lg scale-105'
                  : 'border-secondary-200 hover:border-accent-300',
              ]"
            >
              <div v-if="plan.popular" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span class="bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Mais Popular
                </span>
              </div>

              <div class="text-center">
                <h3 class="text-2xl font-bold text-secondary-800 mb-2">{{ plan.name }}</h3>
                <div class="text-4xl font-bold text-accent-600 mb-2">{{ plan.price }}</div>
                <div class="text-secondary-600 mb-6">{{ plan.requests }} requisições</div>

                <ul class="space-y-3 text-left">
                  <li
                    v-for="feature in plan.features"
                    :key="feature"
                    class="flex items-center text-secondary-600"
                  >
                    <span class="text-accent-500 mr-2">✓</span>
                    {{ feature }}
                  </li>
                </ul>

                <a
                  href="https://sportmetrics.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="[
                    'block w-full mt-8 py-3 px-6 rounded-xl font-bold transition-all',
                    plan.popular
                      ? 'bg-accent-500 text-white hover:bg-accent-600'
                      : 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200',
                  ]"
                >
                  {{ plan.name === 'Enterprise' ? 'Falar com Vendas' : 'Começar Agora' }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Code Examples Tab -->
        <div v-if="activeTab === 'code'" class="space-y-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-secondary-800 mb-4">Exemplos de Código</h2>
            <p class="text-lg text-secondary-600">
              Veja como é fácil integrar a API SportMetrics em seu projeto
            </p>
          </div>

          <div class="space-y-6">
            <div
              v-for="example in codeExamples"
              :key="example.language"
              class="bg-secondary-50 rounded-2xl p-6"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-secondary-800">{{ example.title }}</h3>
                <span class="bg-accent-100 text-accent-600 px-3 py-1 rounded-lg text-sm font-bold">
                  {{ example.language }}
                </span>
              </div>
              <pre
                class="bg-white rounded-lg p-4 overflow-x-auto text-sm"
              ><code>{{ example.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-16">
        <div class="bg-gradient-to-r from-accent-500 to-primary-500 rounded-3xl p-12 text-white">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Pronto para começar?</h2>
          <p class="text-xl mb-8 opacity-90">
            Junte-se a milhares de desenvolvedores que já usam a API SportMetrics
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://sportmetrics.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white text-accent-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              🚀 Criar Conta Gratuita
            </a>
            <a
              href="#documentation"
              class="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-accent-600 transition-colors"
            >
              📚 Ver Documentação
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300;
}

.btn-secondary {
  @apply bg-secondary-100 hover:bg-secondary-200 text-secondary-800 font-bold py-2 px-4 rounded-lg transition-all duration-300;
}

.btn-accent {
  @apply bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl;
}
</style>

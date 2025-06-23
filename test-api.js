import axios from 'axios'
import dotenv from 'dotenv'

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' })

const API_KEY = process.env.VIT_API_FOOTBALL_KEY
const BASE_URL = 'http://localhost:3000'

async function testAPI() {
  console.log('🧪 Testando API Central Time...\n')

  if (!API_KEY) {
    console.error('❌ Erro: VIT_API_FOOTBALL_KEY não configurada')
    console.log('💡 Dica: Crie um arquivo .env.local com sua chave da API')
    process.exit(1)
  }

  console.log('✅ Chave da API configurada')
  console.log(`🌐 URL base: ${BASE_URL}`)
  console.log('')

  try {
    // Teste 1: Buscar Palmeiras
    console.log('🔍 Teste 1: Buscando Palmeiras...')
    const response1 = await axios.get(`${BASE_URL}/api/times?teamName=palmeiras`)
    console.log('✅ Palmeiras encontrado!')
    console.log(`   Nome: ${response1.data.team.name}`)
    console.log(`   País: ${response1.data.team.country}`)
    console.log(`   Fundação: ${response1.data.team.founded}`)
    console.log('')

    // Teste 2: Buscar Flamengo
    console.log('🔍 Teste 2: Buscando Flamengo...')
    const response2 = await axios.get(`${BASE_URL}/api/times?teamName=flamengo`)
    console.log('✅ Flamengo encontrado!')
    console.log(`   Nome: ${response2.data.team.name}`)
    console.log(`   País: ${response2.data.team.country}`)
    console.log(`   Fundação: ${response2.data.team.founded}`)
    console.log('')

    // Teste 3: Time inexistente
    console.log('🔍 Teste 3: Buscando time inexistente...')
    try {
      await axios.get(`${BASE_URL}/api/times?teamName=timeinexistente123`)
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('✅ Erro 404 retornado corretamente para time inexistente')
      } else {
        console.log('⚠️  Resposta inesperada para time inexistente')
      }
    }
    console.log('')

    console.log('🎉 Todos os testes passaram! A API está funcionando corretamente.')
    console.log('')
    console.log('💡 Para usar em desenvolvimento:')
    console.log('   1. Execute: npm run vercel-dev')
    console.log('   2. Acesse: http://localhost:3000')
    console.log('   3. Teste a busca de times')
  } catch (error) {
    console.error('❌ Erro durante os testes:')

    if (error.code === 'ECONNREFUSED') {
      console.error('   Servidor não está rodando')
      console.log('💡 Execute: npm run vercel-dev')
    } else if (error.response?.status === 500) {
      console.error('   Erro interno do servidor')
      console.log('💡 Verifique se a chave da API está correta')
    } else if (error.response?.status === 429) {
      console.error('   Limite de requisições excedido')
      console.log('💡 Aguarde algumas horas ou faça upgrade da conta')
    } else {
      console.error('   Detalhes:', error.message)
    }

    process.exit(1)
  }
}

testAPI()

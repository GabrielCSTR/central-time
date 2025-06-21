// Configuração da API
const isDevelopment = import.meta.env.DEV

// URL base da API
export const API_BASE_URL = isDevelopment
  ? 'http://localhost:3000' // Para desenvolvimento local
  : '' // Para produção (Vercel), usa URL relativa

// Função para construir URLs da API
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}/api${endpoint}`
}

// Endpoints específicos
export const API_ENDPOINTS = {
  team: (teamName: string) => buildApiUrl(`/times?teamName=${teamName}`),
}

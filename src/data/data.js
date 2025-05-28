// Dados mockados para o dashboard de métricas web
export const mockData = {
  // KPIs principais
  kpis: {
    visitors: {
      current: 124567,
      previous: 112430,
      change: 10.8,
      trend: 'up'
    },
    bounceRate: {
      current: 42.3,
      previous: 45.1,
      change: -6.2,
      trend: 'down'
    },
    avgSessionTime: {
      current: 245,
      previous: 231,
      change: 6.1,
      trend: 'up'
    },
    topDevice: {
      current: 'Mobile',
      percentage: 68.4,
      change: 3.2,
      trend: 'up'
    }
  },

  // Dados para gráfico de visitantes (últimos 30 dias)
  visitorsChart: [
    { date: '2024-01-01', visitors: 3245, mobile: 2210, desktop: 892, tablet: 143 },
    { date: '2024-01-02', visitors: 2987, mobile: 2034, desktop: 801, tablet: 152 },
    { date: '2024-01-03', visitors: 4123, mobile: 2801, desktop: 1124, tablet: 198 },
    { date: '2024-01-04', visitors: 3876, mobile: 2634, desktop: 1056, tablet: 186 },
    { date: '2024-01-05', visitors: 4567, mobile: 3105, desktop: 1234, tablet: 228 },
    { date: '2024-01-06', visitors: 5234, mobile: 3559, desktop: 1418, tablet: 257 },
    { date: '2024-01-07', visitors: 4891, mobile: 3325, desktop: 1323, tablet: 243 },
    { date: '2024-01-08', visitors: 3567, mobile: 2425, desktop: 966, tablet: 176 },
    { date: '2024-01-09', visitors: 4234, mobile: 2879, desktop: 1146, tablet: 209 },
    { date: '2024-01-10', visitors: 4789, mobile: 3257, desktop: 1295, tablet: 237 },
    { date: '2024-01-11', visitors: 5123, mobile: 3484, desktop: 1386, tablet: 253 },
    { date: '2024-01-12', visitors: 4456, mobile: 3030, desktop: 1205, tablet: 221 },
    { date: '2024-01-13', visitors: 3789, mobile: 2577, desktop: 1025, tablet: 187 },
    { date: '2024-01-14', visitors: 4567, mobile: 3105, desktop: 1234, tablet: 228 },
    { date: '2024-01-15', visitors: 4234, mobile: 2879, desktop: 1146, tablet: 209 }
  ],

  // Dados para gráfico de dispositivos
  deviceChart: [
    { name: 'Mobile', value: 68.4, color: '#3b82f6' },
    { name: 'Desktop', value: 25.2, color: '#8b5cf6' },
    { name: 'Tablet', value: 6.4, color: '#10b981' }
  ],

  // Dados para gráfico de barras de dispositivos por dia
  deviceBarChart: [
    { name: 'Seg', mobile: 2210, desktop: 892, tablet: 143 },
    { name: 'Ter', mobile: 2034, desktop: 801, tablet: 152 },
    { name: 'Qua', mobile: 2801, desktop: 1124, tablet: 198 },
    { name: 'Qui', mobile: 2634, desktop: 1056, tablet: 186 },
    { name: 'Sex', mobile: 3105, desktop: 1234, tablet: 228 },
    { name: 'Sáb', mobile: 3559, desktop: 1418, tablet: 257 },
    { name: 'Dom', mobile: 3325, desktop: 1323, tablet: 243 }
  ],

  // Tempo de sessão por hora do dia
  hourlySessionTime: [
    { hour: '00h', avgTime: 142, sessions: 234 },
    { hour: '01h', avgTime: 156, sessions: 189 },
    { hour: '02h', avgTime: 134, sessions: 145 },
    { hour: '03h', avgTime: 128, sessions: 112 },
    { hour: '04h', avgTime: 145, sessions: 98 },
    { hour: '05h', avgTime: 167, sessions: 134 },
    { hour: '06h', avgTime: 189, sessions: 256 },
    { hour: '07h', avgTime: 234, sessions: 432 },
    { hour: '08h', avgTime: 267, sessions: 567 },
    { hour: '09h', avgTime: 245, sessions: 689 },
    { hour: '10h', avgTime: 234, sessions: 756 },
    { hour: '11h', avgTime: 256, sessions: 823 },
    { hour: '12h', avgTime: 189, sessions: 734 },
    { hour: '13h', avgTime: 198, sessions: 678 },
    { hour: '14h', avgTime: 234, sessions: 789 },
    { hour: '15h', avgTime: 267, sessions: 856 },
    { hour: '16h', avgTime: 289, sessions: 923 },
    { hour: '17h', avgTime: 312, sessions: 987 },
    { hour: '18h', avgTime: 334, sessions: 1034 },
    { hour: '19h', avgTime: 356, sessions: 1123 },
    { hour: '20h', avgTime: 378, sessions: 1089 },
    { hour: '21h', avgTime: 345, sessions: 934 },
    { hour: '22h', avgTime: 298, sessions: 756 },
    { hour: '23h', avgTime: 234, sessions: 456 }
  ],

  // Taxa de rejeição por página
  bounceRatePages: [
    { page: 'Home', bounceRate: 35.2, sessions: 45678 },
    { page: 'Produtos', bounceRate: 42.8, sessions: 23456 },
    { page: 'Blog', bounceRate: 28.4, sessions: 12345 },
    { page: 'Contato', bounceRate: 52.1, sessions: 8765 },
    { page: 'Sobre', bounceRate: 47.3, sessions: 5432 },
    { page: 'Checkout', bounceRate: 65.7, sessions: 3456 },
    { page: 'Carrinho', bounceRate: 58.9, sessions: 4567 },
    { page: 'Login', bounceRate: 43.2, sessions: 6789 }
  ],

  // Dados para funil de conversão
  conversionFunnel: [
    { name: 'Visitantes', value: 10000, color: '#3b82f6' },
    { name: 'Interesse', value: 6500, color: '#8b5cf6' },
    { name: 'Carrinho', value: 2800, color: '#10b981' },
    { name: 'Checkout', value: 1200, color: '#f59e0b' },
    { name: 'Compra', value: 850, color: '#06d6a0' }
  ],

  // Métricas de tempo real (simulado)
  realTimeMetrics: {
    onlineUsers: 247,
    realtimePageViews: 1234,
    activePageViews: 89,
    conversionRate: 3.2
  },

  // Dados geográficos (simulado)
  geographicData: [
    { country: 'Brasil', visitors: 45678, percentage: 68.5 },
    { country: 'Argentina', visitors: 8765, percentage: 13.1 },
    { country: 'Chile', visitors: 4321, percentage: 6.5 },
    { country: 'Uruguai', visitors: 2345, percentage: 3.5 },
    { country: 'Paraguai', visitors: 1567, percentage: 2.3 },
    { country: 'Outros', visitors: 4021, percentage: 6.1 }
  ],

  // Fontes de tráfego
  trafficSources: [
    { source: 'Orgânico', visitors: 34567, percentage: 52.3, color: '#10b981' },
    { source: 'Direto', visitors: 15432, percentage: 23.4, color: '#3b82f6' },
    { source: 'Social', visitors: 8765, percentage: 13.3, color: '#8b5cf6' },
    { source: 'Email', visitors: 4321, percentage: 6.5, color: '#f59e0b' },
    { source: 'Pago', visitors: 2987, percentage: 4.5, color: '#ef4444' }
  ],

  // Eventos e metas
  goals: [
    { name: 'Newsletter Signup', completions: 1234, rate: 12.4, target: 15.0 },
    { name: 'Download PDF', completions: 987, rate: 9.9, target: 10.0 },
    { name: 'Video View', completions: 2345, rate: 23.5, target: 20.0 },
    { name: 'Contact Form', completions: 543, rate: 5.4, target: 8.0 }
  ],

  // Dados de retenção
  retention: [
    { day: 'Dia 1', users: 100, percentage: 100 },
    { day: 'Dia 2', users: 75, percentage: 75 },
    { day: 'Dia 7', users: 45, percentage: 45 },
    { day: 'Dia 14', users: 32, percentage: 32 },
    { day: 'Dia 30', users: 23, percentage: 23 }
  ]
};

// Funções utilitárias para formatação
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const formatCurrency = (value, currency = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency
  }).format(value);
}; 
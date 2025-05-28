# 📊 DataSight - Dashboard de Métricas Web Avançado

> **DataSight** é um dashboard profissional de métricas web com recursos de análise em tempo real, insights de IA e customização avançada.

![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC?style=flat-square&logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-2.8.0-FF6B6B?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF?style=flat-square&logo=vite)

## ✨ Funcionalidades Principais

### 🚀 **Métricas em Tempo Real**
- **LiveIndicator**: Atualizações automáticas a cada 5 segundos
- **KPIs Dinâmicos**: Métricas principais com atualizações a cada 8 segundos
- **Animações Visuais**: Feedback visual durante atualizações
- **Indicadores de Status**: Pontos pulsantes e badges "LIVE"

### 📈 **Visualizações de Dados**
- **Múltiplos Tipos de Gráficos**: Linha, Barras, Pizza, Multi-linha
- **Gráfico de Dispositivos**: Visualização específica por dispositivos
- **Gráficos Responsivos**: Otimizados para mobile e desktop
- **Tooltips Interativos**: Informações detalhadas ao passar o mouse

### 🔍 **Sistema de Filtros Avançados**
- **Filtros Multi-critério**: Data, dispositivo, página, horário
- **Busca Inteligente**: Busca em tempo real por páginas
- **Histórico de Filtros**: Salva e reutiliza configurações
- **Interface Responsiva**: Painéis adaptáveis para mobile

### 🤖 **AI Insights**
- **Análise Inteligente**: Detecção de padrões e anomalias
- **Recomendações Automatizadas**: Sugestões baseadas em dados
- **Níveis de Confiança**: Scoring de confiabilidade da IA
- **Categorização**: Timing, performance, growth, forecast

### 📊 **Funil de Conversão**
- **Visualização Completa**: Todas as etapas do funil
- **Análise de Abandono**: Identificação de pontos críticos
- **Métricas Detalhadas**: Taxa de conversão por etapa
- **Insights Acionáveis**: Recomendações específicas

### 🔔 **Centro de Notificações**
- **Alertas Inteligentes**: Notificações baseadas em thresholds
- **Categorização**: Error, warning, success, info
- **Histórico**: Gerenciamento de notificações
- **Alertas em Tempo Real**: Monitoramento automático

### 🎨 **Sistema de Temas**
- **Modo Escuro/Claro**: Toggle simples
- **Customização Avançada**: Paletas de cores personalizadas
- **Múltiplos Modos**: Light, Dark, Auto, High-contrast
- **Presets**: Paletas prontas para uso
- **Persistência**: Configurações salvas localmente

### 📤 **Sistema de Exportação**
- **Múltiplos Formatos**: PDF, Excel, CSV, PNG
- **Agendamento**: Exportações automáticas
- **Personalização**: Conteúdo selecionável
- **Histórico**: Controle de exportações anteriores

## 🏗️ Arquitetura do Projeto

```
DataSight/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Dashboard.jsx     # Componente principal
│   │   ├── LiveIndicator.jsx # Métricas em tempo real
│   │   ├── KpiCard.jsx      # Cards de KPI dinâmicos
│   │   ├── MetricsChart.jsx # Sistema de gráficos
│   │   ├── AIInsights.jsx   # Insights de IA
│   │   ├── ConversionFunnel.jsx # Funil de conversão
│   │   ├── AdvancedFilters.jsx  # Sistema de filtros
│   │   ├── NotificationCenter.jsx # Notificações
│   │   ├── ThemeCustomizer.jsx   # Customização de temas
│   │   ├── ExportSystem.jsx     # Sistema de exportação
│   │   └── ThemeToggle.jsx      # Toggle de tema simples
│   ├── data/
│   │   └── data.js          # Dados mockados e utilitários
│   ├── App.jsx              # App principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globais
├── index.html              # Template HTML
├── package.json            # Dependências
├── tailwind.config.js      # Configuração Tailwind
├── vite.config.js          # Configuração Vite
└── README.md               # Documentação
```

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React 18.2.0** - Framework principal
- **Vite 4.5.0** - Build tool e dev server
- **Tailwind CSS 3.3.5** - Framework CSS

### **Visualização de Dados**
- **Recharts 2.8.0** - Biblioteca de gráficos
- **Lucide React 0.292.0** - Ícones

### **Funcionalidades**
- **React Hooks** - Estado e efeitos
- **LocalStorage** - Persistência de configurações
- **CSS Animations** - Animações e transições
- **Responsive Design** - Mobile-first

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 16+ 
- npm ou yarn

## 📱 Responsividade

O dashboard foi desenvolvido com abordagem **mobile-first**:

- **Mobile (< 640px)**: Layout otimizado, componentes compactos
- **Tablet (640px - 1024px)**: Layout intermediário
- **Desktop (> 1024px)**: Layout completo com todas as funcionalidades

### **Otimizações Mobile**
- Painéis de tamanho adaptável
- Texto e ícones redimensionáveis
- Navegação touch-friendly
- Conteúdo priorizado por importância

## 🎯 Funcionalidades Detalhadas

### **KPIs Dinâmicos**
- ✅ Total de Visitantes (atualização a cada 8s)
- ✅ Taxa de Rejeição (lógica invertida: menor = melhor)
- ✅ Tempo Médio de Sessão (formato mm:ss)
- ✅ Dispositivo Principal (% de uso)

### **Métricas em Tempo Real**
- ✅ Usuários Online (atualização a cada 5s)
- ✅ Pageviews em Tempo Real
- ✅ Páginas Ativas
- ✅ Taxa de Conversão Instantânea

### **Tipos de Gráficos**
- ✅ **Line Chart**: Evolução temporal
- ✅ **Bar Chart**: Comparações
- ✅ **Pie Chart**: Distribuições
- ✅ **Multi-line**: Múltiplas séries
- ✅ **Device Bar**: Dispositivos por período

## 🔧 Personalização

### **Temas Disponíveis**
- **Light**: Tema claro padrão
- **Dark**: Tema escuro
- **Auto**: Segue preferência do sistema
- **High Contrast**: Para acessibilidade

### **Paletas de Cores**
- Azul Padrão
- Rosa Vibrante  
- Verde Natureza
- Laranja Energia
- Roxo Real

## 📊 Dados Simulados

O dashboard utiliza dados mockados que simulam:
- Variações realistas de métricas
- Padrões de comportamento de usuários
- Flutuações temporais
- Anomalias e tendências

## 🤝 Contribuição

Este projeto foi desenvolvido com foco em:
- **Código Limpo**: Estrutura modular e documentada
- **Performance**: Otimizações para carregamento
- **Acessibilidade**: Suporte a leitores de tela
- **Escalabilidade**: Arquitetura extensível

## 👨‍💻 Desenvolvedor

**José Lima**
- Dashboard desenvolvido com React, Tailwind CSS, Recharts e Lucide Icons
- Projeto focado em experiência do usuário e performance

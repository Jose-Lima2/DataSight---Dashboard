import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, Lightbulb, ChevronRight, Star, ArrowRight, Zap } from 'lucide-react';

/**
 * Componente AIInsights - Sistema de insights com IA simulada
 * Analisa padrões nos dados e gera recomendações inteligentes
 */
const AIInsights = ({ data }) => {
  const [insights, setInsights] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);

  // Gera insights baseados nos dados usando "IA simulada"
  useEffect(() => {
    const generateInsights = () => {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        const newInsights = [
          {
            id: 'pattern_analysis',
            type: 'pattern',
            title: 'Padrão de Horário Identificado',
            description: 'IA detectou que usuários mobile têm 34% mais engajamento entre 18h-20h',
            confidence: 94,
            impact: 'high',
            recommendation: 'Agende campanhas push para 18h30 nos dias úteis',
            metrics: ['Mobile users +34%', 'Session time +2.3min', 'Conversion +12%'],
            icon: Target,
            category: 'timing'
          },
          {
            id: 'anomaly_detection',
            type: 'anomaly',
            title: 'Anomalia Detectada',
            description: 'Taxa de rejeição na página de produtos 23% acima do normal',
            confidence: 87,
            impact: 'medium',
            recommendation: 'Verificar tempo de carregamento e elementos visuais',
            metrics: ['Bounce rate 65%', 'Expected 42%', 'Impact: -150 conversions/day'],
            icon: TrendingUp,
            category: 'performance'
          },
          {
            id: 'opportunity',
            type: 'opportunity',
            title: 'Oportunidade de Crescimento',
            description: 'Usuários do segmento 25-34 anos têm potencial de conversão 40% maior',
            confidence: 91,
            impact: 'high',
            recommendation: 'Criar campanha direcionada para este segmento específico',
            metrics: ['Segment size: 23%', 'Conv. potential +40%', 'Revenue impact: +R$ 45k/mês'],
            icon: Lightbulb,
            category: 'growth'
          },
          {
            id: 'prediction',
            type: 'prediction',
            title: 'Previsão de Tendência',
            description: 'Modelo prevê aumento de 18% no tráfego mobile nas próximas 2 semanas',
            confidence: 89,
            impact: 'medium',
            recommendation: 'Otimizar experiência mobile e aumentar capacidade de servidor',
            metrics: ['Mobile traffic +18%', 'Peak: 15-22 Nov', 'Server load +25%'],
            icon: Brain,
            category: 'forecast'
          }
        ];
        
        setInsights(newInsights);
        setIsAnalyzing(false);
      }, 2000);
    };

    // Gera insights na montagem e a cada 2 minutos
    generateInsights();
    const interval = setInterval(generateInsights, 120000);

    return () => clearInterval(interval);
  }, [data]);

  const getInsightColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'timing':
        return '⏰';
      case 'performance':
        return '🚀';
      case 'growth':
        return '📈';
      case 'forecast':
        return '🔮';
      default:
        return '🤖';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 dark:text-green-400';
    if (confidence >= 80) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Brain size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Insights
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Análise inteligente de padrões e oportunidades
              </p>
            </div>
          </div>
          
          {isAnalyzing && (
            <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
              <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              Analisando...
            </div>
          )}
        </div>

        {/* Lista de insights */}
        <div className="space-y-3 sm:space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            
            return (
              <div
                key={insight.id}
                className={`p-3 sm:p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                  selectedInsight?.id === insight.id 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } ${index >= 2 ? 'hidden sm:block' : ''}`}
                onClick={() => setSelectedInsight(selectedInsight?.id === insight.id ? null : insight)}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                      <Icon size={16} className="sm:w-5 sm:h-5" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-base sm:text-lg">{getCategoryIcon(insight.category)}</span>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                            {insight.title}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getInsightColor(insight.impact)}`}>
                            {insight.impact.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {insight.description}
                        </p>
                        
                        <div className="flex items-center gap-2 sm:gap-4 text-xs flex-wrap">
                          <div className="flex items-center gap-1">
                            <Star size={12} className={getConfidenceColor(insight.confidence)} />
                            <span className={`font-medium ${getConfidenceColor(insight.confidence)}`}>
                              {insight.confidence}% confiança
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <Zap size={12} />
                            <span>IA Gen 2.0</span>
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight 
                        size={14} 
                        className={`text-gray-400 transition-transform flex-shrink-0 ml-2 ${
                          selectedInsight?.id === insight.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </div>
                </div>

                {/* Detalhes expandidos */}
                {selectedInsight?.id === insight.id && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-purple-200 dark:border-purple-800 space-y-3 sm:space-y-4">
                    {/* Recomendação */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-2 sm:p-3">
                      <h5 className="font-medium text-purple-900 dark:text-purple-300 mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                        <Lightbulb size={14} className="sm:w-4 sm:h-4" />
                        Recomendação da IA
                      </h5>
                      <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-300">
                        {insight.recommendation}
                      </p>
                    </div>

                    {/* Métricas - Oculto em mobile para economizar espaço */}
                    <div className="hidden sm:block">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Métricas Relevantes
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {insight.metrics.map((metric, index) => (
                          <div 
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300"
                          >
                            {metric}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ações - Simplificado para mobile */}
                    <div className="flex gap-2 pt-2">
                      <button className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-600 text-white text-xs sm:text-sm rounded-lg hover:bg-purple-700 transition-colors">
                        <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span className="hidden sm:inline">Implementar</span>
                        <span className="sm:hidden">Ação</span>
                      </button>
                      <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Indicador de insights ocultos em mobile */}
          {insights.length > 2 && (
            <div className="sm:hidden text-center py-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{insights.length - 2} insights adicionais disponíveis na versão desktop
              </span>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                💡 Resumo da Análise
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {insights.length} insights • {insights.filter(i => i.impact === 'high').length} alta prioridade
              </p>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">
                R$ 67k
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Potencial receita
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights; 
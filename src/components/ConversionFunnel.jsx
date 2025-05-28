import { FunnelChart, Funnel, Cell, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { TrendingDown, Users, ShoppingCart, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';

/**
 * Componente ConversionFunnel - Visualiza funil de conversão e análise de abandono
 * Mostra onde os usuários estão saindo do processo
 */
const ConversionFunnel = () => {
  const funnelData = [
    {
      name: 'Visitantes',
      value: 10000,
      icon: Users,
      color: '#3b82f6',
      description: 'Total de visitantes únicos'
    },
    {
      name: 'Interesse',
      value: 6500,
      icon: Users,
      color: '#8b5cf6',
      description: 'Visualizaram produtos'
    },
    {
      name: 'Carrinho',
      value: 2800,
      icon: ShoppingCart,
      color: '#10b981',
      description: 'Adicionaram ao carrinho'
    },
    {
      name: 'Checkout',
      value: 1200,
      icon: CreditCard,
      color: '#f59e0b',
      description: 'Iniciaram o checkout'
    },
    {
      name: 'Compra',
      value: 850,
      icon: CheckCircle,
      color: '#06d6a0',
      description: 'Completaram a compra'
    }
  ];

  // Calcula métricas do funil
  const calculateMetrics = () => {
    const metrics = [];
    
    for (let i = 0; i < funnelData.length; i++) {
      const current = funnelData[i];
      const previous = funnelData[i - 1];
      
      let conversionRate = 100;
      let dropoffRate = 0;
      let dropoffCount = 0;
      
      if (previous) {
        conversionRate = ((current.value / previous.value) * 100);
        dropoffRate = 100 - conversionRate;
        dropoffCount = previous.value - current.value;
      }
      
      metrics.push({
        ...current,
        conversionRate: conversionRate.toFixed(1),
        dropoffRate: dropoffRate.toFixed(1),
        dropoffCount
      });
    }
    
    return metrics;
  };

  const metrics = calculateMetrics();
  const overallConversion = ((funnelData[funnelData.length - 1].value / funnelData[0].value) * 100).toFixed(1);

  // Tooltip customizado
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{data.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{data.description}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Usuários:</span>
              <span className="font-medium">{data.value.toLocaleString('pt-BR')}</span>
            </div>
            {data.conversionRate && (
              <div className="flex justify-between">
                <span>Taxa de Conversão:</span>
                <span className="font-medium text-green-600">{data.conversionRate}%</span>
              </div>
            )}
            {data.dropoffCount > 0 && (
              <div className="flex justify-between">
                <span>Abandono:</span>
                <span className="font-medium text-red-600">{data.dropoffCount.toLocaleString('pt-BR')}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Dados para o gráfico de funil (formato Recharts)
  const chartData = funnelData.map(item => ({
    ...item,
    fill: item.color
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Funil de Conversão
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-600 dark:text-gray-400">
                  Conversão geral: <span className="font-medium text-green-600">{overallConversion}%</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <AlertTriangle size={16} className="text-orange-600" />
                <span className="text-gray-600 dark:text-gray-400">
                  Maior perda: <span className="font-medium text-orange-600">Interesse → Carrinho</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Funil */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                dataKey="value"
                data={chartData}
                isAnimationActive={true}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList position="center" fontSize={12} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>

        {/* Métricas detalhadas */}
        <div className="space-y-3">
          <h4 className="text-md font-semibold text-gray-900 dark:text-white">
            Análise Detalhada
          </h4>
          
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {metrics.map((step, index) => {
              const Icon = step.icon;
              const isFirst = index === 0;
              const hasDropoff = step.dropoffCount > 0;
              
              return (
                <div
                  key={step.name}
                  className={`flex items-center justify-between p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors ${
                    index >= 3 ? 'hidden sm:flex' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div
                      className="p-1.5 sm:p-2 rounded-lg"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <Icon size={16} className="sm:w-5 sm:h-5" style={{ color: step.color }} />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                        {step.name}
                      </h5>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {step.value.toLocaleString('pt-BR')} usuários
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {!isFirst && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-xs sm:text-sm font-medium text-green-600">
                            {step.conversionRate}%
                          </span>
                          <span className="text-xs text-gray-500 hidden sm:inline">conversão</span>
                        </div>
                        {hasDropoff && (
                          <div className="flex items-center gap-1 sm:gap-2">
                            <TrendingDown size={10} className="sm:w-3 sm:h-3 text-red-500" />
                            <span className="text-xs text-red-600">
                              -{Math.floor(step.dropoffCount / 1000)}k
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    {isFirst && (
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Base
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {/* Indicador de métricas ocultas em mobile */}
            {metrics.length > 3 && (
              <div className="sm:hidden text-center py-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{metrics.length - 3} etapas adicionais na versão desktop
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Insights e recomendações */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
            💡 Insights e Recomendações
          </h4>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
              <span>
                A maior perda acontece entre "Interesse" e "Carrinho" (57% de abandono). 
                Considere melhorar a UX da página de produtos.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
              <span>
                Taxa de conversão do checkout para compra é boa (70.8%). 
                O processo de pagamento está funcionando bem.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
              <span>
                Conversão geral de {overallConversion}% está acima da média do e-commerce (2-3%).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnel; 
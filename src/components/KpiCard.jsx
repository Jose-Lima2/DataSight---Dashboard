import { TrendingUp, TrendingDown, Users, Clock, Smartphone, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Componente KpiCard - Exibe um indicador chave de performance (KPI)
 * com valor, mudança percentual e tendência
 */
const KpiCard = ({ title, value, change, trend, type, unit = '' }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  // Detecta mudanças no valor para ativar animação
  useEffect(() => {
    if (value !== prevValue) {
      setIsUpdating(true);
      setPrevValue(value);
      
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  // Função para formatar valores
  const formatValue = (val, type) => {
    if (type === 'time') {
      // Converte segundos para minutos:segundos
      const minutes = Math.floor(val / 60);
      const seconds = val % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    if (typeof val === 'number') {
      return val.toLocaleString('pt-BR');
    }
    
    return val;
  };

  // Função para obter o ícone baseado no tipo
  const getIcon = (type) => {
    const iconProps = { size: 20, className: "w-5 h-5" };
    
    switch (type) {
      case 'visitors':
        return <Users {...iconProps} />;
      case 'bounce':
        return <Eye {...iconProps} />;
      case 'time':
        return <Clock {...iconProps} />;
      case 'device':
        return <Smartphone {...iconProps} />;
      default:
        return <TrendingUp {...iconProps} />;
    }
  };

  // Classes CSS baseadas na tendência
  const trendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  const TrendIcon = trendIcon;
  
  const trendColor = trend === 'up' 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400';
    
  const iconBgColor = trend === 'up' 
    ? 'bg-green-100 dark:bg-green-900/30' 
    : 'bg-red-100 dark:bg-red-900/30';
    
  const iconColor = trend === 'up' 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400';

  const formattedValue = formatValue(value, type);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-all duration-300 ${
      isUpdating ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-lg scale-105' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${iconBgColor} ${
            isUpdating ? 'animate-pulse' : ''
          }`}>
            <div className={iconColor}>
              {getIcon(type)}
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {title}
            </p>
            <p className={`text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-all duration-300 ${
              isUpdating ? 'text-blue-600 dark:text-blue-400' : ''
            }`}>
              {formattedValue}
              {unit && <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{unit}</span>}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`flex items-center space-x-1 transition-all duration-300 ${trendColor} ${
            isUpdating ? 'animate-bounce' : ''
          }`}>
            <TrendIcon size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            vs. anterior
          </p>
        </div>
      </div>
    </div>
  );
};

export default KpiCard; 
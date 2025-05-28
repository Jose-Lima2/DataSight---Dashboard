import { useState, useEffect } from 'react';
import { Zap, TrendingUp, Users, Eye } from 'lucide-react';

/**
 * Componente LiveIndicator - Exibe métricas em tempo real com animações
 * Simula atualizações automáticas de dados
 */
const LiveIndicator = () => {
  const [liveData, setLiveData] = useState({
    onlineUsers: 247,
    realtimePageViews: 1234,
    activePageViews: 89,
    conversionRate: 3.2
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // Simula atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      
      setTimeout(() => {
        setLiveData(prev => ({
          onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 20) - 10,
          realtimePageViews: prev.realtimePageViews + Math.floor(Math.random() * 50),
          activePageViews: prev.activePageViews + Math.floor(Math.random() * 10) - 5,
          conversionRate: Math.max(0, prev.conversionRate + (Math.random() * 0.4) - 0.2)
        }));
        setIsUpdating(false);
      }, 300);
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const LiveCard = ({ icon: Icon, label, value, color, unit = '' }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 ${color} transform transition-all duration-300 ${
      isUpdating ? 'scale-105 shadow-lg' : 'scale-100 shadow-sm'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color.replace('border-l-', 'bg-').replace('-500', '-100')} dark:bg-opacity-20`}>
            <Icon size={20} className={color.replace('border-l-', 'text-')} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {label}
            </p>
            <p className={`text-lg font-bold text-gray-900 dark:text-white transition-all duration-300 ${
              isUpdating ? 'text-blue-600 dark:text-blue-400' : ''
            }`}>
              {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : Math.floor(value)}
              {unit}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${
            isUpdating ? 'bg-green-500 animate-pulse' : 'bg-green-400'
          }`}></div>
          <span className="text-xs font-medium text-green-600 dark:text-green-400">
            LIVE
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Zap size={20} className="text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Métricas em Tempo Real
        </h3>
        <div className={`w-3 h-3 rounded-full ${
          isUpdating ? 'bg-red-500 animate-ping' : 'bg-green-500 animate-pulse'
        }`}></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <LiveCard
          icon={Users}
          label="Usuários Online"
          value={liveData.onlineUsers}
          color="border-l-blue-500"
        />
        <LiveCard
          icon={Eye}
          label="Pageviews Agora"
          value={liveData.realtimePageViews}
          color="border-l-green-500"
        />
        <LiveCard
          icon={TrendingUp}
          label="Páginas Ativas"
          value={liveData.activePageViews}
          color="border-l-purple-500"
        />
        <LiveCard
          icon={TrendingUp}
          label="Taxa Conversão"
          value={liveData.conversionRate}
          color="border-l-orange-500"
          unit="%"
        />
      </div>
    </div>
  );
};

export default LiveIndicator; 
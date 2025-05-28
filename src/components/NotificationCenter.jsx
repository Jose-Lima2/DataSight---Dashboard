import { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, TrendingUp, TrendingDown, Info, CheckCircle, Clock, Settings } from 'lucide-react';

/**
 * Componente NotificationCenter - Centro de notificações e alertas inteligentes
 * Monitora métricas e gera alertas automáticos baseados em thresholds
 */
const NotificationCenter = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [alertSettings, setAlertSettings] = useState({
    trafficDrop: { enabled: true, threshold: 20 },
    bounceRateHigh: { enabled: true, threshold: 60 },
    conversionLow: { enabled: true, threshold: 2 },
    sessionTimeShort: { enabled: true, threshold: 30 }
  });

  // Gera notificações baseadas nos dados
  useEffect(() => {
    const generateNotifications = () => {
      const newNotifications = [];
      const now = new Date();

      // Análise de tráfego (simulado)
      if (alertSettings.trafficDrop.enabled) {
        const trafficDrop = Math.random() > 0.7; // 30% chance
        if (trafficDrop) {
          newNotifications.push({
            id: `traffic_${Date.now()}`,
            type: 'warning',
            title: 'Queda no Tráfego Detectada',
            message: `Tráfego caiu 25% nas últimas 2 horas comparado ao mesmo período ontem.`,
            timestamp: now,
            actionable: true,
            action: 'Investigar causas',
            severity: 'medium'
          });
        }
      }

      // Taxa de rejeição alta
      if (alertSettings.bounceRateHigh.enabled && data?.kpis?.bounceRate?.current > alertSettings.bounceRateHigh.threshold) {
        newNotifications.push({
          id: `bounce_${Date.now()}`,
          type: 'error',
          title: 'Taxa de Rejeição Elevada',
          message: `Taxa de rejeição em ${data.kpis.bounceRate.current}% está acima do limite de ${alertSettings.bounceRateHigh.threshold}%`,
          timestamp: now,
          actionable: true,
          action: 'Otimizar landing pages',
          severity: 'high'
        });
      }

      // Conversão baixa (simulado)
      if (alertSettings.conversionLow.enabled) {
        const lowConversion = Math.random() > 0.8; // 20% chance
        if (lowConversion) {
          newNotifications.push({
            id: `conversion_${Date.now()}`,
            type: 'warning',
            title: 'Conversão Abaixo da Meta',
            message: 'Taxa de conversão nas últimas 4 horas está 15% abaixo da média.',
            timestamp: now,
            actionable: true,
            action: 'Revisar funil',
            severity: 'medium'
          });
        }
      }

      // Insights positivos
      const positiveInsight = Math.random() > 0.6; // 40% chance
      if (positiveInsight) {
        newNotifications.push({
          id: `insight_${Date.now()}`,
          type: 'success',
          title: 'Melhoria Detectada',
          message: 'Tempo de sessão aumentou 12% desde a última atualização do site.',
          timestamp: now,
          actionable: false,
          severity: 'low'
        });
      }

      // Alertas de sistema
      const systemAlert = Math.random() > 0.9; // 10% chance
      if (systemAlert) {
        newNotifications.push({
          id: `system_${Date.now()}`,
          type: 'info',
          title: 'Atualização Disponível',
          message: 'Nova versão do dashboard disponível com melhorias de performance.',
          timestamp: now,
          actionable: true,
          action: 'Atualizar agora',
          severity: 'low'
        });
      }

      return newNotifications;
    };

    // Gera notificações na primeira carga e depois a cada 30 segundos
    const generateInitial = () => {
      const initial = generateNotifications();
      if (initial.length > 0) {
        setNotifications(prev => [...initial, ...prev].slice(0, 10)); // Máximo 10 notificações
        setUnreadCount(prev => prev + initial.length);
      }
    };

    generateInitial();
    const interval = setInterval(generateInitial, 30000);

    return () => clearInterval(interval);
  }, [data, alertSettings]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'error':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'warning':
        return <TrendingDown size={20} className="text-orange-500" />;
      case 'success':
        return <TrendingUp size={20} className="text-green-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const dismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return timestamp.toLocaleDateString('pt-BR');
  };

  return (
    <div className="relative">
      {/* Botão de notificações */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) markAllAsRead();
        }}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        title="Notificações"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Painel de notificações */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notificações
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Limpar
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            {notifications.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {notifications.length} notificação(ões)
              </p>
            )}
          </div>

          {/* Lista de notificações */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhuma notificação no momento
                </p>
              </div>
            ) : (
              <div className="space-y-2 p-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border transition-all duration-200 ${getNotificationBgColor(notification.type)} ${
                      notification.read ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {notification.title}
                          </h4>
                          <button
                            onClick={() => dismissNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0 ml-2"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock size={12} />
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          
                          {notification.actionable && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs px-2 py-1 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                            >
                              {notification.action}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button
              className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center justify-center gap-1"
            >
              <Settings size={14} />
              Configurar Alertas
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationCenter; 
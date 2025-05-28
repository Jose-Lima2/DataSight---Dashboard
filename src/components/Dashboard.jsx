import { useState, useEffect } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import KpiCard from './KpiCard';
import MetricsChart from './MetricsChart';
import ThemeToggle from './ThemeToggle';
import ThemeCustomizer from './ThemeCustomizer';
import LiveIndicator from './LiveIndicator';
import AdvancedFilters from './AdvancedFilters';
import ConversionFunnel from './ConversionFunnel';
import NotificationCenter from './NotificationCenter';
import AIInsights from './AIInsights';
import ExportSystem from './ExportSystem';
import { mockData } from '../data/data';

/**
 * Componente Dashboard - Interface principal do dashboard de métricas web
 * Exibe KPIs, gráficos e permite filtros por período
 */
const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeFilters, setActiveFilters] = useState({});
  const [dynamicKpis, setDynamicKpis] = useState(mockData.kpis);

  // Simula atualizações dos KPIs em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicKpis(prev => {
        const visitorsChange = (Math.random() * 20) - 10; // -10% a +10%
        const bounceRateChange = (Math.random() * 10) - 5; // -5% a +5%
        const sessionTimeChange = (Math.random() * 15) - 7.5; // -7.5% a +7.5%
        const deviceChange = (Math.random() * 6) - 3; // -3% a +3%

        return {
          visitors: {
            current: Math.max(100000, prev.visitors.current + Math.floor(Math.random() * 200) - 100),
            change: visitorsChange,
            trend: visitorsChange >= 0 ? 'up' : 'down'
          },
          bounceRate: {
            current: Math.max(20, Math.min(80, prev.bounceRate.current + (Math.random() * 4) - 2)),
            change: bounceRateChange,
            trend: bounceRateChange <= 0 ? 'up' : 'down' // Para bounce rate, menor é melhor
          },
          avgSessionTime: {
            current: Math.max(120, Math.min(400, prev.avgSessionTime.current + Math.floor(Math.random() * 20) - 10)),
            change: sessionTimeChange,
            trend: sessionTimeChange >= 0 ? 'up' : 'down'
          },
          topDevice: {
            current: 'Mobile',
            percentage: Math.max(60, Math.min(75, prev.topDevice.percentage + (Math.random() * 2) - 1)),
            change: deviceChange,
            trend: deviceChange >= 0 ? 'up' : 'down'
          }
        };
      });
    }, 8000); // Atualiza a cada 8 segundos

    return () => clearInterval(interval);
  }, []);

  // Opções de período para filtro
  const periodOptions = [
    { value: 'week', label: 'Última Semana' },
    { value: 'month', label: 'Último Mês' },
    { value: 'year', label: 'Último Ano' }
  ];

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
    console.log('Filtros aplicados:', filters);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  <span className="block sm:hidden">DataSight</span>
                  <span className="hidden sm:block">DataSight - Dashboard de Métricas Web</span>
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Filtros Avançados - Visível em todas as telas */}
              <AdvancedFilters onFiltersChange={handleFiltersChange} data={mockData} />
              
              {/* Notificações - Visível em todas as telas */}
              <NotificationCenter data={mockData} />
              
              {/* Exportação - Oculto em mobile */}
              <div className="hidden sm:block">
                <ExportSystem data={mockData} />
              </div>
              
              {/* Customizador de Temas - Oculto em mobile */}
              <div className="hidden md:block">
                <ThemeCustomizer />
              </div>
              
              {/* Toggle de Tema Simples - Sempre visível */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Métricas em Tempo Real */}
          <section className="animate-fade-in">
            <LiveIndicator />
          </section>

          {/* KPIs Principais */}
          <section className="animate-slide-up">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                📊 Métricas Principais
              </h2>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Atualização automática</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <KpiCard
                title="Total de Visitantes"
                value={dynamicKpis.visitors.current}
                change={dynamicKpis.visitors.change}
                trend={dynamicKpis.visitors.trend}
                type="visitors"
              />
              <KpiCard
                title="Taxa de Rejeição"
                value={dynamicKpis.bounceRate.current}
                change={dynamicKpis.bounceRate.change}
                trend={dynamicKpis.bounceRate.trend}
                type="bounce"
                unit="%"
              />
              <KpiCard
                title="Tempo Médio de Sessão"
                value={dynamicKpis.avgSessionTime.current}
                change={dynamicKpis.avgSessionTime.change}
                trend={dynamicKpis.avgSessionTime.trend}
                type="time"
              />
              <KpiCard
                title="Dispositivo Principal"
                value={dynamicKpis.topDevice.current}
                change={dynamicKpis.topDevice.change}
                trend={dynamicKpis.topDevice.trend}
                type="device"
                unit={`${dynamicKpis.topDevice.percentage.toFixed(1)}%`}
              />
            </div>
          </section>

          {/* Gráficos e Análises */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Gráfico de Visitantes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📈 Evolução de Visitantes
              </h3>
              <MetricsChart 
                data={mockData.visitorsChart} 
                type="line" 
                title="Visitantes por Dia"
                height={300}
              />
            </div>

            {/* Gráfico de Dispositivos */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📱 Distribuição por Dispositivos
              </h3>
              <MetricsChart 
                data={mockData.deviceChart} 
                type="pie" 
                title="Dispositivos"
                height={300}
              />
            </div>
          </section>

          {/* Funil de Conversão */}
          <section className="animate-slide-up">
            <ConversionFunnel />
          </section>

          {/* AI Insights */}
          <section className="animate-fade-in">
            <AIInsights data={mockData} />
          </section>

          {/* Gráficos Adicionais */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Gráfico de Horários */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ⏰ Tempo de Sessão por Hora
              </h3>
              <MetricsChart 
                data={mockData.hourlySessionTime} 
                type="bar" 
                title="Tempo por Hora"
                height={300}
              />
            </div>

            {/* Gráfico Multi-linha */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📊 Visitantes por Dispositivo
              </h3>
              <MetricsChart 
                data={mockData.deviceBarChart} 
                type="device-bar" 
                height={300}
              />
            </div>
          </section>

          {/* Footer com informações */}
          <footer className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="text-center">
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Dashboard desenvolvido com React, Tailwind CSS, Recharts e Lucide Icons
                </p>
                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  💻 Desenvolvido por José Lima
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 
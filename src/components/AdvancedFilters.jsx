import { useState, useEffect } from 'react';
import { Search, Filter, X, Calendar, Globe, Smartphone, Monitor, Tablet, ChevronDown, Clock } from 'lucide-react';

/**
 * Componente AdvancedFilters - Sistema avançado de filtros e busca
 * Permite filtros múltiplos, busca de páginas e histórico de filtros
 */
const AdvancedFilters = ({ onFiltersChange, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'month',
    devices: [],
    pages: [],
    timeRange: 'all',
    bounceRateRange: [0, 100],
    sessionDurationRange: [0, 600]
  });
  const [filtersHistory, setFiltersHistory] = useState([]);

  const filterOptions = {
    dateRanges: [
      { value: 'today', label: 'Hoje', icon: Clock },
      { value: 'week', label: 'Última Semana', icon: Calendar },
      { value: 'month', label: 'Último Mês', icon: Calendar },
      { value: 'quarter', label: 'Último Trimestre', icon: Calendar },
      { value: 'year', label: 'Último Ano', icon: Calendar },
      { value: 'custom', label: 'Período Personalizado', icon: Calendar }
    ],
    devices: [
      { value: 'mobile', label: 'Mobile', icon: Smartphone },
      { value: 'desktop', label: 'Desktop', icon: Monitor },
      { value: 'tablet', label: 'Tablet', icon: Tablet }
    ],
    timeRanges: [
      { value: 'all', label: 'Todo o dia' },
      { value: 'morning', label: 'Manhã (6h-12h)' },
      { value: 'afternoon', label: 'Tarde (12h-18h)' },
      { value: 'evening', label: 'Noite (18h-24h)' },
      { value: 'night', label: 'Madrugada (0h-6h)' }
    ]
  };

  // Páginas disponíveis baseadas nos dados
  const availablePages = data?.bounceRatePages?.map(page => page.page) || 
    ['Home', 'Produtos', 'Blog', 'Contato', 'Sobre'];

  // Páginas filtradas pela busca
  const filteredPages = availablePages.filter(page => 
    page.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Atualiza filtros e notifica componente pai
  useEffect(() => {
    onFiltersChange?.(activeFilters);
  }, [activeFilters, onFiltersChange]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      
      // Salva no histórico se for uma mudança significativa
      if (filterType === 'dateRange' || filterType === 'devices') {
        saveToHistory(newFilters);
      }
      
      return newFilters;
    });
  };

  const handleMultiSelectChange = (filterType, value) => {
    setActiveFilters(prev => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
  };

  const handleRangeChange = (filterType, range) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: range }));
  };

  const saveToHistory = (filters) => {
    const timestamp = new Date().toLocaleString('pt-BR');
    const historyItem = {
      id: Date.now(),
      filters,
      timestamp,
      label: generateFilterLabel(filters)
    };
    
    setFiltersHistory(prev => [historyItem, ...prev.slice(0, 4)]); // Mantém apenas 5 itens
  };

  const generateFilterLabel = (filters) => {
    const parts = [];
    if (filters.dateRange !== 'month') {
      const dateOption = filterOptions.dateRanges.find(d => d.value === filters.dateRange);
      parts.push(dateOption?.label);
    }
    if (filters.devices.length > 0) {
      parts.push(`${filters.devices.length} dispositivo(s)`);
    }
    if (filters.pages.length > 0) {
      parts.push(`${filters.pages.length} página(s)`);
    }
    return parts.join(', ') || 'Filtros padrão';
  };

  const applyHistoryFilter = (historyItem) => {
    setActiveFilters(historyItem.filters);
    setIsOpen(false);
  };

  const clearAllFilters = () => {
    setActiveFilters({
      dateRange: 'month',
      devices: [],
      pages: [],
      timeRange: 'all',
      bounceRateRange: [0, 100],
      sessionDurationRange: [0, 600]
    });
    setSearchQuery('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters.dateRange !== 'month') count++;
    if (activeFilters.devices.length > 0) count++;
    if (activeFilters.pages.length > 0) count++;
    if (activeFilters.timeRange !== 'all') count++;
    if (activeFilters.bounceRateRange[0] > 0 || activeFilters.bounceRateRange[1] < 100) count++;
    if (activeFilters.sessionDurationRange[0] > 0 || activeFilters.sessionDurationRange[1] < 600) count++;
    return count;
  };

  return (
    <div className="relative">
      {/* Botão de filtros */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          getActiveFiltersCount() > 0
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
      >
        <Filter size={16} />
        <span className="text-sm font-medium hidden sm:inline">Filtros</span>
        {getActiveFiltersCount() > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
            {getActiveFiltersCount()}
          </span>
        )}
        <ChevronDown size={14} className={`transition-transform hidden sm:inline ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Painel de filtros */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 z-50 max-h-96 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filtros Avançados
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={clearAllFilters}
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

            {/* Busca de páginas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Buscar Páginas
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Digite o nome da página..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Período */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Período
              </label>
              <div className="grid grid-cols-2 gap-2">
                {filterOptions.dateRanges.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('dateRange', option.value)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-all ${
                      activeFilters.dateRange === option.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <option.icon size={14} />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dispositivos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Dispositivos
              </label>
              <div className="space-y-2">
                {filterOptions.devices.map((device) => (
                  <label key={device.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.devices.includes(device.value)}
                      onChange={() => handleMultiSelectChange('devices', device.value)}
                      className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                    />
                    <device.icon size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{device.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Páginas selecionadas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Páginas ({filteredPages.length})
              </label>
              <div className="max-h-32 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-600 rounded-lg p-2">
                {filteredPages.map((page) => (
                  <label key={page} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.pages.includes(page)}
                      onChange={() => handleMultiSelectChange('pages', page)}
                      className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{page}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Horário do dia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Horário do Dia
              </label>
              <select
                value={activeFilters.timeRange}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {filterOptions.timeRanges.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Histórico de filtros */}
            {filtersHistory.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Filtros Recentes
                </label>
                <div className="space-y-2">
                  {filtersHistory.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => applyHistoryFilter(item)}
                      className="w-full text-left p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.timestamp}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
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

export default AdvancedFilters; 
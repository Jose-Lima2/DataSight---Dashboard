import { useState } from 'react';
import { Download, FileText, Table, Image, Calendar, Settings, CheckCircle, Clock, Mail } from 'lucide-react';

/**
 * Componente ExportSystem - Sistema avançado de exportação
 * Permite exportar dados em múltiplos formatos com personalização
 */
const ExportSystem = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    dateRange: 'month',
    includeCharts: true,
    includeKpis: true,
    includeInsights: true,
    includeComparison: false,
    customTitle: '',
    logoInclude: true,
    schedule: 'none'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      name: 'Relatório Mensal - Outubro',
      format: 'PDF',
      date: new Date('2024-11-01'),
      size: '2.3 MB',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Dados KPI - Semana 44',
      format: 'CSV',
      date: new Date('2024-10-28'),
      size: '845 KB',
      status: 'completed'
    }
  ]);

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Relatório completo com gráficos e insights',
      icon: FileText,
      features: ['Gráficos vetoriais', 'Layout profissional', 'Insights inclusos'],
      recommended: true
    },
    {
      id: 'excel',
      name: 'Excel (.xlsx)',
      description: 'Planilha com dados brutos e tabelas dinâmicas',
      icon: Table,
      features: ['Múltiplas abas', 'Fórmulas', 'Tabelas dinâmicas']
    },
    {
      id: 'csv',
      name: 'CSV',
      description: 'Dados em formato simples para análise',
      icon: Table,
      features: ['Compatível universalmente', 'Leve', 'Importação fácil']
    },
    {
      id: 'png',
      name: 'Imagens PNG',
      description: 'Gráficos individuais em alta resolução',
      icon: Image,
      features: ['Alta resolução', 'Transparência', 'Pronto para apresentação']
    }
  ];

  const scheduleOptions = [
    { value: 'none', label: 'Não agendar' },
    { value: 'daily', label: 'Diário (8h)' },
    { value: 'weekly', label: 'Semanal (Segunda 9h)' },
    { value: 'monthly', label: 'Mensal (1º dia 10h)' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simula processo de exportação
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simula download
    const blob = new Blob(['Dados simulados do dashboard'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${Date.now()}.${exportConfig.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Adiciona ao histórico
    const newExport = {
      id: exportHistory.length + 1,
      name: exportConfig.customTitle || `Relatório ${exportConfig.format.toUpperCase()}`,
      format: exportConfig.format.toUpperCase(),
      date: new Date(),
      size: Math.random() > 0.5 ? `${(Math.random() * 5 + 1).toFixed(1)} MB` : `${Math.floor(Math.random() * 900 + 100)} KB`,
      status: 'completed'
    };
    
    setExportHistory(prev => [newExport, ...prev]);
    setIsExporting(false);
    setIsOpen(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedSize = () => {
    let size = 500; // Base KB
    
    if (exportConfig.includeCharts) size += 1500;
    if (exportConfig.includeKpis) size += 200;
    if (exportConfig.includeInsights) size += 300;
    if (exportConfig.includeComparison) size += 800;
    
    if (exportConfig.format === 'pdf') size *= 1.2;
    else if (exportConfig.format === 'excel') size *= 0.8;
    else if (exportConfig.format === 'csv') size *= 0.1;
    
    return size > 1000 ? `${(size / 1000).toFixed(1)} MB` : `${Math.floor(size)} KB`;
  };

  return (
    <div className="relative">
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        title="Exportar dados"
      >
        <Download size={16} />
        <span className="hidden sm:inline">Exportar</span>
      </button>

      {/* Modal de exportação */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Exportar Dashboard
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Configure e baixe seus dados em múltiplos formatos
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Seleção de formato */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Escolha o Formato
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {exportFormats.map((format) => {
                        const Icon = format.icon;
                        return (
                          <div
                            key={format.id}
                            className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                              exportConfig.format === format.id
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                            onClick={() => setExportConfig(prev => ({ ...prev, format: format.id }))}
                          >
                            {format.recommended && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                Recomendado
                              </div>
                            )}
                            
                            <div className="flex items-start gap-3">
                              <Icon size={24} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  {format.name}
                                </h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {format.description}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {format.features.map((feature, index) => (
                                    <span
                                      key={index}
                                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Configurações de conteúdo */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Conteúdo do Relatório
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={exportConfig.includeKpis}
                          onChange={(e) => setExportConfig(prev => ({ ...prev, includeKpis: e.target.checked }))}
                          className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Incluir KPIs principais
                        </span>
                      </label>
                      
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={exportConfig.includeCharts}
                          onChange={(e) => setExportConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                          className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Incluir gráficos e visualizações
                        </span>
                      </label>
                      
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={exportConfig.includeInsights}
                          onChange={(e) => setExportConfig(prev => ({ ...prev, includeInsights: e.target.checked }))}
                          className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Incluir insights da IA
                        </span>
                      </label>
                      
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={exportConfig.includeComparison}
                          onChange={(e) => setExportConfig(prev => ({ ...prev, includeComparison: e.target.checked }))}
                          className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Incluir comparação com período anterior
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Personalização */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Personalização
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Título personalizado
                        </label>
                        <input
                          type="text"
                          value={exportConfig.customTitle}
                          onChange={(e) => setExportConfig(prev => ({ ...prev, customTitle: e.target.value }))}
                          placeholder="Ex: Relatório Q4 2024"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Agendar exportação
                        </label>
                        <select
                          value={exportConfig.schedule}
                          onChange={(e) => setExportConfig(prev => ({ ...prev, schedule: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {scheduleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar com preview e histórico */}
                <div className="space-y-6">
                  {/* Preview */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Preview da Exportação
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Formato:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {exportFormats.find(f => f.id === exportConfig.format)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tamanho estimado:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {getEstimatedSize()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Período:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          Último mês
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Histórico de exportações */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Exportações Recentes
                    </h4>
                    <div className="space-y-2">
                      {exportHistory.slice(0, 3).map((export_) => (
                        <div
                          key={export_.id}
                          className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle size={14} className="text-green-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {export_.name}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {export_.format} • {export_.size} • {formatDate(export_.date)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botão de exportação */}
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isExporting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Exportando...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Baixar Agora
                      </>
                    )}
                  </button>
                  
                  {exportConfig.schedule !== 'none' && (
                    <div className="text-xs text-center text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                      <Mail size={12} />
                      Será enviado por email automaticamente
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportSystem; 
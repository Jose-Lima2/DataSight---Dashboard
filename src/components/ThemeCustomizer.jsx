import { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Monitor, Contrast, Save, RotateCcw } from 'lucide-react';

/**
 * Componente ThemeCustomizer - Personalização avançada de temas
 * Permite múltiplos temas e personalização de cores
 */
const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [highContrast, setHighContrast] = useState(false);
  const [customColors, setCustomColors] = useState({
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#10b981'
  });

  const themes = [
    { id: 'light', name: 'Claro', icon: Sun },
    { id: 'dark', name: 'Escuro', icon: Moon },
    { id: 'auto', name: 'Sistema', icon: Monitor },
    { id: 'high-contrast', name: 'Alto Contraste', icon: Contrast }
  ];

  const colorPresets = [
    { name: 'Azul Padrão', primary: '#3b82f6', secondary: '#8b5cf6', accent: '#10b981' },
    { name: 'Rosa Vibrante', primary: '#ec4899', secondary: '#f59e0b', accent: '#8b5cf6' },
    { name: 'Verde Natureza', primary: '#059669', secondary: '#0d9488', accent: '#65a30d' },
    { name: 'Laranja Energia', primary: '#ea580c', secondary: '#dc2626', accent: '#7c2d12' },
    { name: 'Roxo Real', primary: '#7c3aed', secondary: '#a855f7', accent: '#c084fc' }
  ];

  // Carrega preferências salvas
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedColors = JSON.parse(localStorage.getItem('customColors') || '{}');
    
    setCurrentTheme(savedTheme);
    setHighContrast(savedHighContrast);
    setCustomColors(prev => ({ ...prev, ...savedColors }));
    
    applyTheme(savedTheme, savedHighContrast, { ...customColors, ...savedColors });
  }, []);

  // Aplica tema ao documento
  const applyTheme = (theme, contrast, colors) => {
    const root = document.documentElement;
    
    // Remove classes anteriores
    root.classList.remove('light', 'dark', 'high-contrast');
    
    // Aplica novo tema
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
    
    // Alto contraste
    if (contrast) {
      root.classList.add('high-contrast');
    }
    
    // Cores customizadas
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    applyTheme(themeId, highContrast, customColors);
  };

  const handleContrastToggle = () => {
    const newContrast = !highContrast;
    setHighContrast(newContrast);
    localStorage.setItem('highContrast', newContrast.toString());
    applyTheme(currentTheme, newContrast, customColors);
  };

  const handleColorChange = (colorType, value) => {
    const newColors = { ...customColors, [colorType]: value };
    setCustomColors(newColors);
    localStorage.setItem('customColors', JSON.stringify(newColors));
    applyTheme(currentTheme, highContrast, newColors);
  };

  const applyColorPreset = (preset) => {
    setCustomColors(preset);
    localStorage.setItem('customColors', JSON.stringify(preset));
    applyTheme(currentTheme, highContrast, preset);
  };

  const resetToDefaults = () => {
    const defaults = { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#10b981' };
    setCurrentTheme('light');
    setHighContrast(false);
    setCustomColors(defaults);
    localStorage.removeItem('theme');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('customColors');
    applyTheme('light', false, defaults);
  };

  return (
    <div className="relative">
      {/* Botão de abertura */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        title="Personalizar tema"
      >
        <Palette size={20} />
      </button>

      {/* Painel de personalização */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 z-50">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Personalizar Tema
              </h3>
              <button
                onClick={resetToDefaults}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
              >
                <RotateCcw size={14} />
                Resetar
              </button>
            </div>

            {/* Seleção de tema */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Modo de Cor
              </label>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((theme) => {
                  const Icon = theme.icon;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                        currentTheme === theme.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-sm font-medium">{theme.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Alto contraste */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Alto Contraste
              </label>
              <button
                onClick={handleContrastToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  highContrast ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Cores customizadas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Cores Personalizadas
              </label>
              <div className="space-y-3">
                {Object.entries(customColors).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {key === 'primary' ? 'Principal' : key === 'secondary' ? 'Secundária' : 'Destaque'}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-20 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Presets de cores */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Paletas Prontas
              </label>
              <div className="grid grid-cols-1 gap-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyColorPreset(preset)}
                    className="flex items-center justify-between p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {preset.name}
                    </span>
                    <div className="flex gap-1">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para fechar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeCustomizer; 
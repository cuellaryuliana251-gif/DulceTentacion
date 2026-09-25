import React, { useState, useEffect } from 'react';
import { InventoryItem, AIDocumentExtractionResult, GitCommitRecord } from '../types';
import { SAMPLE_INVOICE_PRESETS } from '../data/mockData';
import {
  Sparkles,
  FileText,
  Upload,
  RefreshCw,
  GitBranch,
  CloudCheck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers,
  Cpu
} from 'lucide-react';

interface AIInventoryHubProps {
  inventory: InventoryItem[];
  onUpdateInventory: (updated: InventoryItem[]) => void;
}

export const AIInventoryHub: React.FC<AIInventoryHubProps> = ({
  inventory,
  onUpdateInventory,
}) => {
  const [activeTab, setActiveTab] = useState<'extractor' | 'inventario' | 'github'>('extractor');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [invoiceText, setInvoiceText] = useState<string>(SAMPLE_INVOICE_PRESETS[0].content);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [extractionResult, setExtractionResult] = useState<AIDocumentExtractionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [syncSuccessNotice, setSyncSuccessNotice] = useState<string | null>(null);

  // GitHub & Cloud status
  const [commits, setCommits] = useState<GitCommitRecord[]>([]);
  const [isSyncingGit, setIsSyncingGit] = useState<boolean>(false);
  const [gitStatus, setGitStatus] = useState<any>(null);

  // Fetch initial Git status
  useEffect(() => {
    fetch('/api/sync/status')
      .then(res => res.json())
      .then(data => {
        if (data.commits) setCommits(data.commits);
        if (data.cloudPipeline) setGitStatus(data.cloudPipeline);
      })
      .catch(err => console.error('Error fetching git status', err));
  }, []);

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setInvoiceText(SAMPLE_INVOICE_PRESETS[index].content);
    setExtractionResult(null);
  };

  const handleProcessDocument = async () => {
    if (!invoiceText.trim()) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/ai/extract-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: invoiceText,
          documentName: SAMPLE_INVOICE_PRESETS[selectedPresetIndex]?.name || 'Documento Comercial',
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo procesar el documento con el servidor.');
      }

      const data: AIDocumentExtractionResult = await response.json();
      setExtractionResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error al conectar con la inteligencia artificial');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyToInventory = () => {
    if (!extractionResult?.extractedItems) return;

    const newInventory = [...inventory];
    extractionResult.extractedItems.forEach(item => {
      // Find matching item or append
      const existing = newInventory.find(inv => 
        inv.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0]) ||
        item.name.toLowerCase().includes(inv.name.toLowerCase().split(' ')[0])
      );

      if (existing) {
        existing.stock += item.quantityReceived || item.stockImpact || 10;
        existing.lastUpdated = `IA Sync ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        newInventory.push({
          id: `inv-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          name: item.name,
          category: (item.category as any) || 'insumo',
          stock: item.quantityReceived || 20,
          unit: item.unit || 'uds',
          unitCostCOP: item.unitCost || 5000,
          minimumThreshold: 10,
          lastUpdated: `IA Sync ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`,
        });
      }
    });

    onUpdateInventory(newInventory);
    setSyncSuccessNotice(`¡Inventario actualizado con ${extractionResult.extractedItems.length} insumos de la factura!`);
    setTimeout(() => setSyncSuccessNotice(null), 3500);

    // Auto trigger GitHub sync in background
    triggerGitHubCommit(`sync(inventory): actualización de ${extractionResult.extractedItems.length} insumos desde ${extractionResult.supplierOrEntity}`);
  };

  const triggerGitHubCommit = async (customMessage?: string) => {
    setIsSyncingGit(true);
    try {
      const response = await fetch('/api/sync/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inventoryCount: inventory.length,
          changesSummary: customMessage || `chore(inventory): sincronización en tiempo real (${inventory.length} materias primas)`,
        }),
      });
      const data = await response.json();
      if (data.commit) {
        setCommits(prev => [data.commit, ...prev.slice(0, 7)]);
        setGitStatus(data.cloudPipeline);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncingGit(false);
    }
  };

  return (
    <section id="ai-hub" className="py-16 md:py-24 bg-white border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 tracking-wide uppercase">
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            <span>Automatización & Gestión Inteligente</span>
            <span aria-hidden="true">·</span>
            <span>Gemini AI Engine</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#29150d] font-bold mt-1 tracking-tight">
            Extracción con IA & Sincronización en Tiempo Real
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
            Procesa facturas de proveedores, remisiones de compra y catálogos de repostería con inteligencia artificial para actualizar automáticamente las materias primas y sincronizar el inventario con GitHub y despliegue en la nube.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100/80 rounded-xl max-w-md mb-8 border border-stone-200">
          <button
            onClick={() => setActiveTab('extractor')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'extractor'
                ? 'bg-white text-purple-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Escáner IA de Facturas</span>
          </button>
          <button
            onClick={() => setActiveTab('inventario')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'inventario'
                ? 'bg-white text-purple-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Stock en Vivo ({inventory.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'github'
                ? 'bg-white text-purple-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-stone-700" />
            <span>GitHub & Cloud Deploy</span>
          </button>
        </div>

        {/* Tab 1: AI Extractor */}
        {activeTab === 'extractor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Panel */}
            <div className="lg:col-span-6 bg-[#FFF9FA] rounded-2xl p-6 border border-pink-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Documento Comercial o Factura
                </span>
                <span className="text-[11px] text-pink-700 font-semibold">Gemini 3.8 Flash</span>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                {SAMPLE_INVOICE_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all text-left ${
                      selectedPresetIndex === idx
                        ? 'border-purple-600 bg-purple-100/70 font-semibold text-purple-950'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-pink-300'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={invoiceText}
                  onChange={(e) => setInvoiceText(e.target.value)}
                  rows={8}
                  placeholder="Pega aquí el contenido de la factura, recibo o catálogo..."
                  className="w-full text-xs font-mono bg-white border border-stone-200 rounded-xl p-3.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-purple-600 leading-relaxed resize-none"
                />
              </div>

              {/* Process action */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Detección de productos, costos y unidades</span>
                </span>

                <button
                  type="button"
                  onClick={handleProcessDocument}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 rounded-xl shadow-xs transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Analizando con IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Extraer Datos con IA</span>
                    </>
                  )}
                </button>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-purple-200/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <span className="text-xs font-bold text-purple-950 uppercase tracking-wider block">
                    Resultado Estructurado por IA
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {extractionResult ? `${extractionResult.supplierOrEntity} · ${extractionResult.documentNumber}` : 'Listo para procesar factura'}
                  </span>
                </div>

                {extractionResult && (
                  <span className="font-data text-xs font-bold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-md border border-pink-200">
                    Total: ${extractionResult.totalAmount.toLocaleString('es-CO')} COP
                  </span>
                )}
              </div>

              {!extractionResult ? (
                <div className="py-12 text-center text-stone-400 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-400 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="text-xs max-w-xs mx-auto">
                    Haz clic en "Extraer Datos con IA" para procesar la factura y desglosar automáticamente las materias primas para Dulce Tentación.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* AI Summary Banner */}
                  <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl text-xs text-purple-950 leading-relaxed">
                    <p className="font-semibold text-purple-900 mb-0.5">Diagnóstico IA:</p>
                    <p>{extractionResult.aiSummary}</p>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {extractionResult.extractedItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-stone-50/80 rounded-xl border border-stone-200 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <p className="font-semibold text-[#29150d]">{item.name}</p>
                          <p className="text-[11px] text-stone-500">
                            Categoría: <span className="text-purple-700 font-medium">{item.category}</span> · Cantidad: {item.quantityReceived} {item.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-data font-bold text-stone-800">
                            ${item.unitCost.toLocaleString('es-CO')} COP
                          </span>
                          <span className="block text-[10px] text-emerald-700 font-medium">
                            +{item.stockImpact} en stock
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sync Action */}
                  <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Validación de impuestos y matemáticas OK</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleApplyToInventory}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all active:scale-95"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Sincronizar con Inventario</span>
                    </button>
                  </div>
                </div>
              )}

              {syncSuccessNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{syncSuccessNotice}</span>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Live Inventory */}
        {activeTab === 'inventario' && (
          <div className="bg-white rounded-2xl border border-pink-200/80 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif-brand text-lg font-bold text-[#29150d]">
                  Monitor de Materias Primas e Insumos en Vivo
                </h3>
                <p className="text-xs text-stone-500">
                  Control en tiempo real para la producción de donas en Gualanday, Tolima
                </p>
              </div>

              <button
                type="button"
                onClick={() => triggerGitHubCommit('sync(stock): verificación periódica de almacén')}
                disabled={isSyncingGit}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGit ? 'animate-spin' : ''}`} />
                <span>Resincronizar Stock</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-[#FFF6F9] text-stone-500 uppercase tracking-wider font-semibold border-b border-pink-100 text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Insumo / Producto</th>
                    <th className="py-3 px-4">Categoría</th>
                    <th className="py-3 px-4 text-center">Stock Actual</th>
                    <th className="py-3 px-4">Costo Estimado (COP)</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4">Última Actualización</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {inventory.map((item) => {
                    const isLow = item.stock <= item.minimumThreshold;
                    return (
                      <tr key={item.id} className="hover:bg-pink-50/30 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-[#29150d]">
                          {item.name}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 text-[11px] rounded bg-purple-50 text-purple-800 border border-purple-200">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-data font-bold text-sm">
                          {item.stock} <span className="text-[11px] font-normal text-stone-500">{item.unit}</span>
                        </td>
                        <td className="py-3.5 px-4 font-data">
                          ${item.unitCostCOP.toLocaleString('es-CO')}
                        </td>
                        <td className="py-3.5 px-4">
                          {isLow ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Reposición urgente</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <CheckCircle className="w-3 h-3" />
                              <span>Stock Óptimo</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                          {item.lastUpdated}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: GitHub & Cloud Deploy Status */}
        {activeTab === 'github' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Deploy Status Overview */}
            <div className="lg:col-span-5 bg-[#FFF9FA] rounded-2xl p-6 border border-pink-200 space-y-5">
              <div>
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                  Infraestructura Cloud & CI/CD
                </span>
                <p className="text-xs text-stone-600 mt-1">
                  Despliegue automatizado y balanceo de carga para alto volumen de compras simultáneas.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CloudCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-stone-800">Servicio de Hosting</span>
                  </div>
                  <span className="font-medium text-purple-800">Netlify & Cloud Run</span>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-stone-800">Seguridad & DDoS</span>
                  </div>
                  <span className="text-emerald-700 font-semibold">Activo TLS 1.3</span>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-pink-600" />
                    <span className="font-semibold text-stone-800">Disponibilidad (Uptime)</span>
                  </div>
                  <span className="font-data font-bold text-emerald-700">{gitStatus?.uptime || '99.98%'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerGitHubCommit()}
                disabled={isSyncingGit}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-xs"
              >
                <GitBranch className="w-4 h-4 text-pink-400" />
                <span>{isSyncingGit ? 'Publicando en GitHub...' : 'Forzar Commit & Despliegue en la Nube'}</span>
              </button>
            </div>

            {/* Commit Log History */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Historial de Sincronización en GitHub
                </span>
                <span className="text-xs text-stone-500 font-mono">rama: main</span>
              </div>

              <div className="space-y-3">
                {commits.map((commit) => (
                  <div
                    key={commit.sha}
                    className="p-3 rounded-xl border border-stone-100 hover:border-pink-200 bg-[#FCFBFB] flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                          {commit.sha}
                        </span>
                        <span className="font-medium text-[#29150d] line-clamp-1">{commit.message}</span>
                      </div>
                      <p className="text-[11px] text-stone-400">
                        {commit.author} · {new Date(commit.timestamp).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <span className="shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                      Desplegado
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

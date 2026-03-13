"use client";

import { Plus, Wrench, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type ServiceStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface ServiceRequest {
  id: string;
  description: string;
  type: string;
  status: ServiceStatus;
  createdAt: string;
}

const mockChamados: ServiceRequest[] = [
  { id: '1', description: 'Vazamento no banheiro principal', type: 'Hidráulica', status: 'IN_PROGRESS', createdAt: '2026-03-05' },
  { id: '2', description: 'Tomada da cozinha não funciona', type: 'Elétrica', status: 'PENDING', createdAt: '2026-03-06' },
];

export default function MeusChamados() {
  const [chamados, setChamados] = useState<ServiceRequest[]>(mockChamados);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChamado, setNewChamado] = useState({ description: '', type: 'Hidráulica' });

  const handleCreateChamado = () => {
    if (!newChamado.description.trim()) {
      toast.error('Descreva o problema');
      return;
    }

    const novoChamado: ServiceRequest = {
      id: String(Date.now()),
      description: newChamado.description,
      type: newChamado.type,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setChamados([novoChamado, ...chamados]);
    setNewChamado({ description: '', type: 'Hidráulica' });
    setIsModalOpen(false);
    toast.success('Chamado aberto!');
  };

  const statusCounts = {
    PENDING: chamados.filter(c => c.status === 'PENDING').length,
    IN_PROGRESS: chamados.filter(c => c.status === 'IN_PROGRESS').length,
    COMPLETED: chamados.filter(c => c.status === 'COMPLETED').length
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="w-8 h-8 text-blue-600" />
            Meus Chamados
          </h1>
          <p className="text-gray-500 mt-1">Gerencie suas solicitações de manutenção</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          <Plus className="w-5 h-5" /> Abrir Chamado
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border-l-4 border-yellow-400 shadow-sm">
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="text-3xl font-bold">{statusCounts.PENDING}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-l-4 border-blue-400 shadow-sm">
          <p className="text-sm text-gray-500">Em Progresso</p>
          <p className="text-3xl font-bold">{statusCounts.IN_PROGRESS}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-l-4 border-green-400 shadow-sm">
          <p className="text-sm text-gray-500">Concluídos</p>
          <p className="text-3xl font-bold">{statusCounts.COMPLETED}</p>
        </div>
      </div>

      <div className="space-y-4">
        {chamados.map((chamado) => (
          <div key={chamado.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-lg">Chamado #{chamado.id}</h3>
              <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100">{chamado.status}</span>
            </div>
            <p className="text-gray-600">{chamado.description}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Novo Chamado</h2>
            <div className="space-y-4">
              <select 
                className="w-full p-2 border rounded-lg"
                value={newChamado.type}
                onChange={(e) => setNewChamado({ ...newChamado, type: e.target.value })}
              >
                <option value="Hidráulica">Hidráulica</option>
                <option value="Elétrica">Elétrica</option>
              </select>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={4}
                placeholder="Descreva o problema..."
                value={newChamado.description}
                onChange={(e) => setNewChamado({ ...newChamado, description: e.target.value })}
              />
              <button onClick={handleCreateChamado} className="w-full py-2 bg-gray-900 text-white rounded-lg">
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
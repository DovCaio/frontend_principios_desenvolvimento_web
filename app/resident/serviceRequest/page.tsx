"use client";

import { api } from '@/utils/requests/api';
import { Plus, Wrench, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type ServiceStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface ServiceRequest {
  id: number;
  description: string;
  type: string;
  status: ServiceStatus;
  createdAt: string;
  targetLotId?: number;
}

export default function MeusChamados() {
  const [chamados, setChamados] = useState<ServiceRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newChamado, setNewChamado] = useState({ 
    description: '', 
    type: 'Hidráulica',
    targetLotId: '' 
  });

  const fetchChamados = async () => {
    try {
      const userCpf = localStorage.getItem('userCpf');
      const response = await api.get('/service-request/me', {
        headers: { 'x-user-cpf': userCpf }
      });
      setChamados(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar os chamados.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChamados();
  }, []);

  const handleCreateChamado = async () => {
    if (!newChamado.description.trim()) {
      toast.error('Descreva o problema.');
      return;
    }

    if (!newChamado.targetLotId.trim()) {
      toast.error('Informe o número do Lote/Apartamento.');
      return;
    }

    setIsSubmitting(true);

    try {
      const userCpf = localStorage.getItem('userCpf');

      await api.post('/service-request', {
        description: newChamado.description,
        type: newChamado.type,
        targetLotId: Number(newChamado.targetLotId)
      }, {
        headers: {
          'x-user-cpf': userCpf
        }
      });

      setNewChamado({ description: '', type: 'Hidráulica', targetLotId: '' });
      setIsModalOpen(false);
      toast.success('Chamado aberto com sucesso!');
      fetchChamados();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao abrir o chamado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusCounts = {
    PENDING: chamados.filter(c => c.status === 'PENDING').length,
    IN_PROGRESS: chamados.filter(c => c.status === 'IN_PROGRESS').length,
    COMPLETED: chamados.filter(c => c.status === 'COMPLETED').length
  };

  const getStatusBadge = (status: ServiceStatus) => {
    const variants = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800'
    };
    
    const labels = {
      PENDING: 'PENDENTE',
      IN_PROGRESS: 'EM PROGRESSO',
      COMPLETED: 'CONCLUÍDO'
    };

    return (
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${variants[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="w-8 h-8 text-blue-600" />
            Meus Chamados
          </h1>
          <p className="text-gray-500 mt-1 font-medium">Gerencie suas solicitações de manutenção</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" /> Abrir Chamado
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border-l-4 border-yellow-400 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Pendentes</p>
          <p className="text-4xl font-black text-gray-900">{isLoading ? '-' : statusCounts.PENDING}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-l-4 border-blue-400 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Em Progresso</p>
          <p className="text-4xl font-black text-gray-900">{isLoading ? '-' : statusCounts.IN_PROGRESS}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-l-4 border-green-400 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Concluídos</p>
          <p className="text-4xl font-black text-gray-900">{isLoading ? '-' : statusCounts.COMPLETED}</p>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500 font-medium">Carregando seus chamados...</div>
        ) : chamados.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Você ainda não abriu nenhum chamado de manutenção.</p>
          </div>
        ) : (
          chamados.map((chamado) => (
            <div key={chamado.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    Chamado #{chamado.id}
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">
                      {chamado.type}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    Aberto em {new Date(chamado.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {getStatusBadge(chamado.status)}
              </div>
              <p className="text-gray-700 font-medium">{chamado.description}</p>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900">Novo Chamado</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Tipo de Problema</label>
                <select 
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  value={newChamado.type}
                  onChange={(e) => setNewChamado({ ...newChamado, type: e.target.value })}
                >
                  <option value="Hidráulica">Hidráulica</option>
                  <option value="Elétrica">Elétrica</option>
                  <option value="Marcenaria">Marcenaria</option>
                  <option value="Alvenaria">Alvenaria</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Lote / Apartamento</label>
                <input 
                  type="number"
                  placeholder="Ex: 101"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  value={newChamado.targetLotId}
                  onChange={(e) => setNewChamado({ ...newChamado, targetLotId: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Descrição</label>
                <textarea
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium resize-none"
                  rows={4}
                  placeholder="Descreva o problema com detalhes..."
                  value={newChamado.description}
                  onChange={(e) => setNewChamado({ ...newChamado, description: e.target.value })}
                />
              </div>

              <button 
                onClick={handleCreateChamado} 
                disabled={isSubmitting}
                className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Solicitação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
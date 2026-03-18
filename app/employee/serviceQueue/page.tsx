"use client";

import { api } from '@/utils/requests/api';
import { CheckCircle, MapPin, Play, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type ServiceStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface ServiceRequest {
  id: number;
  description: string;
  type: string;
  status: ServiceStatus;
  createdAt: string;
  apartment: string;
}

export default function ServiceQueue() {
  const [chamados, setChamados] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChamados = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await api.get('/employee/service-request', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setChamados(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar a fila de manutenção.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChamados();
  }, []);

  const handleUpdateStatus = async (id: number, currentStatus: ServiceStatus, newStatus: ServiceStatus) => {
    if (currentStatus === 'PENDING' && newStatus !== 'IN_PROGRESS') return;
    if (currentStatus === 'IN_PROGRESS' && newStatus !== 'COMPLETED') return;

    try {
      const userCpf = localStorage.getItem('userCpf');
      
      await api.put(`/service-request/${id}`, 
        { status: newStatus },
        { 
          headers: { 
            'x-user-cpf': userCpf 
          } 
        }
      );
      
      const updatedChamados = chamados.map(chamado => 
        chamado.id === id ? { ...chamado, status: newStatus } : chamado
      );

      setChamados(updatedChamados);
      toast.success(`Status atualizado para ${newStatus === 'IN_PROGRESS' ? 'Em Progresso' : 'Concluído'}!`);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar o status do chamado.');
    }
  };

  const getStatusBadge = (status: ServiceStatus) => {
    const variants = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
      COMPLETED: 'bg-green-100 text-green-800 border-green-200'
    };
    
    const labels = {
      PENDING: 'AGUARDANDO ATENDIMENTO',
      IN_PROGRESS: 'EM EXECUÇÃO',
      COMPLETED: 'FINALIZADO'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wide ${variants[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Wrench className="w-8 h-8 text-blue-600" />
          Fila de Manutenção
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Gerencie as solicitações dos moradores e atualize o status dos reparos.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-500 py-12 font-medium">Carregando chamados...</div>
        ) : chamados?.length === 0 ? (
          <div className="text-center text-gray-400 py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
            <Wrench className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium text-gray-500">Nenhum chamado de manutenção na fila.</p>
          </div>
        ) : (
          chamados?.map((chamado) => (
            <div key={chamado.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-6 transition-all hover:border-blue-300 hover:shadow-md">
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white rounded-md font-bold text-sm">
                    <MapPin className="w-4 h-4" />
                    Apt {chamado.apartment}
                  </div>
                  {getStatusBadge(chamado.status)}
                </div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{chamado.type}</p>
                <p className="text-gray-900 font-medium mb-3 text-lg">{chamado.description}</p>
                <div className="text-xs text-gray-500 font-mono font-medium">
                  ID: #{chamado.id} • Aberto em {new Date(chamado.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[180px]">
                {chamado.status === 'PENDING' && (
                  <button 
                    onClick={() => handleUpdateStatus(chamado.id, chamado.status, 'IN_PROGRESS')}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Play className="w-5 h-5" /> Iniciar Reparo
                  </button>
                )}

                {chamado.status === 'IN_PROGRESS' && (
                  <button 
                    onClick={() => handleUpdateStatus(chamado.id, chamado.status, 'COMPLETED')}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm"
                  >
                    <CheckCircle className="w-5 h-5" /> Finalizar
                  </button>
                )}

                {chamado.status === 'COMPLETED' && (
                  <div className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-gray-400 rounded-lg font-bold border border-gray-200 cursor-not-allowed">
                    <CheckCircle className="w-5 h-5" /> Resolvido
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
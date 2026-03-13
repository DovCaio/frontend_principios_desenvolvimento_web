"use client";

import { CheckCircle, MapPin, Play, Wrench } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type ServiceStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface ServiceRequest {
  id: string;
  description: string;
  type: string;
  status: ServiceStatus;
  createdAt: string;
  apartment: string; // Crucial para o funcionário saber onde ir
}

const mockFila: ServiceRequest[] = [
  { id: '1', description: 'Vazamento no banheiro principal, água escorrendo pela parede', type: 'Hidráulica', status: 'IN_PROGRESS', createdAt: '2026-03-05', apartment: '101' },
  { id: '2', description: 'Tomada da cozinha não está funcionando', type: 'Elétrica', status: 'PENDING', createdAt: '2026-03-06', apartment: '204' },
  { id: '3', description: 'Porta do armário da área de serviço soltou da dobradiça', type: 'Marcenaria', status: 'COMPLETED', createdAt: '2026-03-01', apartment: '302' },
];

export default function ServiceQueue() {
  const [chamados, setChamados] = useState<ServiceRequest[]>(mockFila);

  // Espelho da sua regra de negócio no ServiceRequestService.update()
  const handleUpdateStatus = (id: string, currentStatus: ServiceStatus, newStatus: ServiceStatus) => {
    
    // Travas de segurança do front-end
    if (currentStatus === 'PENDING' && newStatus !== 'IN_PROGRESS') return;
    if (currentStatus === 'IN_PROGRESS' && newStatus !== 'COMPLETED') return;

    /* TODO: Integração API (PUT)
       Aqui você enviará para o back-end o ID do chamado e o novo status.
       O CPF do funcionário virá do seu contexto de autenticação.
    */

    const updatedChamados = chamados.map(chamado => 
      chamado.id === id ? { ...chamado, status: newStatus } : chamado
    );

    setChamados(updatedChamados);
    toast.success(`Status atualizado para ${newStatus === 'IN_PROGRESS' ? 'Em Progresso' : 'Concluído'}!`);
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
      {/* Cabeçalho */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Wrench className="w-8 h-8 text-blue-600" />
          Fila de Manutenção
        </h1>
        <p className="text-gray-500 mt-2">Gerencie as solicitações dos moradores e atualize o status dos reparos.</p>
      </div>

      {/* Lista de Tarefas do Funcionário */}
      <div className="space-y-4">
        {chamados.map((chamado) => (
          <div key={chamado.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-6 transition-all hover:border-blue-100 hover:shadow-md">
            
            {/* Informações Básicas */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white rounded-md font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                  Apt {chamado.apartment}
                </div>
                {getStatusBadge(chamado.status)}
              </div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{chamado.type}</p>
              <p className="text-gray-800 font-medium mb-3">{chamado.description}</p>
              <div className="text-xs text-gray-400 font-mono">
                ID: #{chamado.id} • Aberto em {new Date(chamado.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </div>

            {/* Ações (Botões Dinâmicos baseados na sua regra) */}
            <div className="flex flex-col gap-2 min-w-[180px]">
              {chamado.status === 'PENDING' && (
                <button 
                  onClick={() => handleUpdateStatus(chamado.id, chamado.status, 'IN_PROGRESS')}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Play className="w-5 h-5" /> Iniciar Reparo
                </button>
              )}

              {chamado.status === 'IN_PROGRESS' && (
                <button 
                  onClick={() => handleUpdateStatus(chamado.id, chamado.status, 'COMPLETED')}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
                >
                  <CheckCircle className="w-5 h-5" /> Finalizar
                </button>
              )}

              {chamado.status === 'COMPLETED' && (
                <div className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-gray-400 rounded-lg font-medium border border-gray-100 cursor-not-allowed">
                  <CheckCircle className="w-5 h-5" /> Resolvido
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
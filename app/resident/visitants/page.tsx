"use client";

import { Calendar, Package, Trash2, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type VisitorType = 'GUEST' | 'SERVICE_PROVIDER';

interface PreAuthorizedVisitor {
  id: string;
  name: string;
  cpf: string;
  type: VisitorType;
  expectedDate: string;
}

const mockVisitors: PreAuthorizedVisitor[] = [
  { id: '1', name: 'Carlos Eduardo', cpf: '111.222.333-44', type: 'GUEST', expectedDate: '2026-03-14' },
  { id: '2', name: 'Ifood (Entregador)', cpf: '', type: 'SERVICE_PROVIDER', expectedDate: '2026-03-13' }
];

export default function MeusVisitantes() {
  const [visitors, setVisitors] = useState<PreAuthorizedVisitor[]>(mockVisitors);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [expectedDate, setExpectedDate] = useState('');

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleAuthorize = (type: VisitorType) => {
    if (!name.trim() || !expectedDate) {
      toast.error('Preencha pelo menos o nome e a data esperada.');
      return;
    }

    /* TODO: Integração API (POST)
       Aqui o morador envia a pré-autorização pro banco.
       A portaria vai consumir essa lista para liberar a entrada.
    */

    const newVisitor: PreAuthorizedVisitor = {
      id: String(Date.now()),
      name,
      cpf,
      type,
      expectedDate
    };

    setVisitors([newVisitor, ...visitors]);
    setName('');
    setCpf('');
    setExpectedDate('');
    
    toast.success('Autorização registrada com sucesso!');
  };

  const handleRevoke = (id: string, visitorName: string) => {
    /* TODO: Integração API (DELETE) */
    setVisitors(visitors.filter(v => v.id !== id));
    toast.info(`Autorização de ${visitorName} cancelada.`);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <UserPlus className="w-8 h-8 text-blue-600" />
          Meus Visitantes
        </h1>
        <p className="text-gray-500">
          Pré-autorize a entrada de amigos, familiares e prestadores de serviço.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Formulário de Autorização */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
          <div className="p-6 border-b bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Nova Autorização</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo / Empresa</label>
              <input
                type="text"
                placeholder="Ex: João da Silva ou iFood"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">CPF (Opcional para entregas)</label>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                maxLength={14}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Data Esperada</label>
              <input
                type="date"
                min={today}
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              />
            </div>

            <div className="pt-4 space-y-3">
              <button
                className="flex items-center justify-center gap-2 w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
                onClick={() => handleAuthorize('GUEST')}
              >
                <Users className="w-5 h-5" />
                Autorizar Visita
              </button>
              <button
                className="flex items-center justify-center gap-2 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors"
                onClick={() => handleAuthorize('SERVICE_PROVIDER')}
              >
                <Package className="w-5 h-5" />
                Autorizar Serviço / Entrega
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Autorizados */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Pessoas Autorizadas</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
              {visitors.length} Registros
            </span>
          </div>
          
          <div className="p-6">
            {visitors.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p className="text-lg">Você não tem nenhuma autorização ativa.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {visitors.map((visitor) => (
                  <div key={visitor.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-bold text-gray-900 text-lg">{visitor.name}</p>
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm ${
                          visitor.type === 'GUEST' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
                        }`}>
                          {visitor.type === 'GUEST' ? 'Visita' : 'Serviço'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 flex flex-wrap gap-4">
                        {visitor.cpf && <span className="font-mono">CPF: {visitor.cpf}</span>}
                        <span className="flex items-center gap-1 text-blue-600 font-medium">
                          <Calendar className="w-4 h-4" />
                          {visitor.expectedDate.split('-').reverse().join('/')}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRevoke(visitor.id, visitor.name)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Revogar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
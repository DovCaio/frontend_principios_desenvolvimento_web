"use client";

import { Package, UserCheck, Users } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type EntryType = 'GUEST' | 'SERVICE_PROVIDER';

interface AccessLog {
  id: string;
  cpf: string;
  name: string;
  type: EntryType;
  apartment: string;
  entryTime: string;
  status: 'OPEN';
}

export default function ControleAcesso() {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [apartment, setApartment] = useState('');
  const [logs, setLogs] = useState<AccessLog[]>([]);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleEntry = (type: EntryType) => {
    if (!cpf.trim() || !name.trim() || !apartment.trim()) {
      toast.error('Preencha todos os campos do visitante.');
      return;
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    /* TODO: Integração API (POST)
       Aqui você vai enviar os dados pro backend criar o registro no banco.
    */

    const log: AccessLog = {
      id: String(Date.now()),
      cpf,
      name,
      type,
      apartment,
      entryTime: timeStr,
      status: 'OPEN'
    };

    setLogs([log, ...logs]);
    setCpf('');
    setName('');
    setApartment('');
    
    const typeLabel = type === 'GUEST' ? 'Visita' : 'Prestador de Serviço';
    toast.success(`${typeLabel} registrado(a) com sucesso!`);
  };

  const quickFill = () => {
    setCpf('123.456.789-00');
    setName('Roberto Silva');
    setApartment('101');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <UserCheck className="w-8 h-8 text-blue-600" />
          Controle de Acesso
        </h1>
        <p className="text-gray-500">
          Registre entradas de visitantes e prestadores de serviço na portaria.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Formulário de Entrada */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Registrar Entrada</h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">CPF do Visitante</label>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                maxLength={14}
                autoFocus
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
              <input
                type="text"
                placeholder="Nome do visitante"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Apartamento de Destino</label>
              <input
                type="text"
                placeholder="Ex: 101"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm h-28"
                onClick={() => handleEntry('GUEST')}
              >
                <Users className="w-8 h-8" />
                <span className="font-bold text-lg">Entrada Visita</span>
              </button>
              <button
                className="flex flex-col items-center justify-center gap-2 p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors shadow-sm h-28"
                onClick={() => handleEntry('SERVICE_PROVIDER')}
              >
                <Package className="w-8 h-8" />
                <span className="font-bold text-lg">Entrada Serviço</span>
              </button>
            </div>

            <button
              className="w-full mt-4 py-2 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
              onClick={quickFill}
            >
              Preencher Teste Rápido
            </button>
          </div>
        </div>

        {/* Últimas Entradas e Estatísticas */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Últimas Entradas Registradas</h2>
            </div>
            <div className="p-5">
              {logs.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <UserCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma entrada registrada ainda hoje.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
                  {logs.slice(0, 10).map((log) => (
                    <div key={log.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-gray-900">{log.name}</p>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                          log.type === 'GUEST' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {log.type === 'GUEST' ? 'VISITA' : 'SERVIÇO'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex justify-between"><span>CPF:</span> <span className="font-mono">{log.cpf}</span></p>
                        <p className="flex justify-between"><span>Destino:</span> <span className="font-bold">Apt {log.apartment}</span></p>
                        <p className="flex justify-between text-xs mt-2 text-gray-400"><span>Entrada registrada às:</span> <span>{log.entryTime}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                <p className="text-sm text-gray-500 font-medium mb-1">Total de Entradas</p>
                <p className="text-3xl font-black text-blue-600">{logs.length}</p>
             </div>
             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                <p className="text-sm text-gray-500 font-medium mb-1">Prestadores</p>
                <p className="text-3xl font-black text-green-600">{logs.filter(l => l.type === 'SERVICE_PROVIDER').length}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
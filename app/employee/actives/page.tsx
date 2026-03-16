"use client";

import { api } from '@/utils/requests/api';
import { LogOut, Search, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ActivePerson {
  id: number;
  visitorId: number;
  name: string;
  cpf: string;
  type: 'GUEST' | 'SERVICE_PROVIDER';
  apartment: string;
  entryTime: string;
}

interface ExitedPerson extends ActivePerson {
  exitTime: string;
}

export default function PainelAtivos() {
  const [activePeople, setActivePeople] = useState<ActivePerson[]>([]);
  const [recentExits, setRecentExits] = useState<ExitedPerson[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchActivePeople = async () => {
    try {
      const response = await api.get('/access/active');
      setActivePeople(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar a lista de ativos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivePeople();
  }, []);

  const handleRegisterExit = async (person: ActivePerson) => {
    try {
      await api.post('/access/exit', { visitorId: person.visitorId });
      
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const exitedPerson: ExitedPerson = { ...person, exitTime: timeStr };
      
      setRecentExits(prev => [exitedPerson, ...prev].slice(0, 5));
      
      toast.success(`Saída registrada: ${person.name}`);
      fetchActivePeople();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao registrar a saída.');
    }
  };

  const filteredActivePeople = activePeople.filter(person => {
    const term = searchTerm.toLowerCase();
    return (
      (person.name && person.name.toLowerCase().includes(term)) ||
      (person.cpf && person.cpf.includes(searchTerm)) ||
      (person.apartment && person.apartment.includes(searchTerm))
    );
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Users className="w-8 h-8 text-blue-600" />
          Painel de Ativos
        </h1>
        <p className="text-gray-500 font-medium">
          Gerencie as pessoas que estão atualmente dentro do condomínio.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Dentro do Condomínio</p>
          <p className="text-4xl font-black text-blue-600">{activePeople.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Visitas</p>
          <p className="text-4xl font-black text-blue-600">
            {activePeople.filter(p => p.type === 'GUEST').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Prestadores</p>
          <p className="text-4xl font-black text-green-600">
            {activePeople.filter(p => p.type === 'SERVICE_PROVIDER').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Saídas Registradas</p>
          <p className="text-4xl font-black text-gray-600">{recentExits.length}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Lista de Presentes</h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar nome, CPF ou apt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
              />
            </div>
          </div>
          
          <div className="p-6">
            {isLoading ? (
              <div className="text-center text-gray-500 py-12 font-medium">Carregando dados...</div>
            ) : filteredActivePeople.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium text-gray-500">
                  {searchTerm ? 'Nenhum resultado encontrado.' : 'O condomínio está vazio no momento.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredActivePeople.map((person) => (
                  <div key={person.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors bg-white gap-4 shadow-sm">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <p className="font-bold text-lg text-gray-900">{person.name}</p>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                          person.type === 'GUEST' 
                            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                            : 'bg-green-50 text-green-700 border border-green-200'
                        }`}>
                          {person.type === 'GUEST' ? 'VISITA' : 'SERVIÇO'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-2 mt-3">
                        <span className="font-mono text-gray-900">{person.cpf}</span>
                        <span className="font-bold text-gray-900">Apt {person.apartment}</span>
                        <span className="text-blue-600 font-medium">Entrada: {person.entryTime}</span>
                      </div>
                    </div>
                    
                    <button
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 border-2 border-red-100 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                      onClick={() => handleRegisterExit(person)}
                    >
                      <LogOut className="w-5 h-5" />
                      Registrar Saída
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 h-fit">
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">Saídas Recentes</h2>
          </div>
          <div className="p-5">
            {recentExits.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                <p className="font-medium text-gray-500">Nenhuma saída registrada nesta sessão.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentExits.map((person, index) => (
                  <div key={`${person.id}-${index}`} className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
                    <p className="font-bold text-gray-900 mb-3">{person.name}</p>
                    <div className="text-xs text-gray-600 space-y-2 font-medium">
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span>Destino:</span> <span className="text-gray-900 font-bold">Apt {person.apartment}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span>Entrada:</span> <span>{person.entryTime}</span>
                      </p>
                      <p className="flex justify-between text-red-600 pt-1 font-bold">
                        <span>Saída:</span> <span>{person.exitTime}</span>
                      </p>
                    </div>
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
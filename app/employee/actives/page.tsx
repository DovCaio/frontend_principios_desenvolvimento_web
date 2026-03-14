"use client";

import { LogOut, Search, Users } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type PersonStatus = 'OPEN' | 'CLOSED';

interface ActivePerson {
  id: string;
  name: string;
  cpf: string;
  type: 'GUEST' | 'SERVICE_PROVIDER';
  apartment: string;
  entryTime: string;
  exitTime?: string;
  status: PersonStatus;
}

const mockActivePeople: ActivePerson[] = [
  { id: '1', name: 'Roberto Silva', cpf: '123.456.789-00', type: 'GUEST', apartment: '101', entryTime: '14:30', status: 'OPEN' },
  { id: '2', name: 'Maria Santos', cpf: '987.654.321-00', type: 'SERVICE_PROVIDER', apartment: '205', entryTime: '10:15', status: 'OPEN' },
  { id: '3', name: 'José Costa', cpf: '456.789.123-00', type: 'GUEST', apartment: '302', entryTime: '16:00', status: 'OPEN' },
  { id: '4', name: 'Ana Lima', cpf: '321.654.987-00', type: 'GUEST', apartment: '105', entryTime: '09:30', exitTime: '11:45', status: 'CLOSED' }
];

export default function PainelAtivos() {
  const [people, setPeople] = useState<ActivePerson[]>(mockActivePeople);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRegisterExit = (id: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    /* TODO: Integração API (PUT)
       Enviar ao backend que essa pessoa saiu, atualizando o status para CLOSED e gravando a hora.
    */

    setPeople(people.map(person =>
      person.id === id
        ? { ...person, status: 'CLOSED' as const, exitTime: timeStr }
        : person
    ));
    
    const person = people.find(p => p.id === id);
    toast.success(`Saída registrada: ${person?.name}`);
  };

  const activePeople = people.filter(p => p.status === 'OPEN');
  const filteredActivePeople = activePeople.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.cpf.includes(searchTerm) ||
    person.apartment.includes(searchTerm)
  );

  const recentExits = people.filter(p => p.status === 'CLOSED').slice(0, 5);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Users className="w-8 h-8 text-blue-600" />
          Painel de Ativos
        </h1>
        <p className="text-gray-500">
          Gerencie as pessoas que estão atualmente dentro do condomínio.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Dentro do Condomínio</p>
          <p className="text-4xl font-black text-blue-600">{activePeople.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Visitas</p>
          <p className="text-4xl font-black text-blue-600">{activePeople.filter(p => p.type === 'GUEST').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Prestadores</p>
          <p className="text-4xl font-black text-green-600">{activePeople.filter(p => p.type === 'SERVICE_PROVIDER').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Saídas Hoje</p>
          <p className="text-4xl font-black text-gray-600">{people.filter(p => p.status === 'CLOSED').length}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Pessoas Ativas */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Lista de Presentes</h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar nome, CPF ou apt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>
          
          <div className="p-6">
            {filteredActivePeople.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>{searchTerm ? 'Nenhum resultado encontrado.' : 'O condomínio está vazio no momento.'}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivePeople.map((person) => (
                  <div key={person.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <p className="font-bold text-lg text-gray-900">{person.name}</p>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          person.type === 'GUEST' ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-800'
                        }`}>
                          {person.type === 'GUEST' ? 'VISITA' : 'SERVIÇO'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
                        <span className="font-mono">{person.cpf}</span>
                        <span className="font-medium text-gray-900">Apt: {person.apartment}</span>
                        <span className="text-blue-600">Entrou às: {person.entryTime}</span>
                      </div>
                    </div>
                    
                    <button
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 border-2 border-red-500 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors"
                      onClick={() => handleRegisterExit(person.id)}
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

        {/* Saídas Recentes */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 h-fit">
          <div className="p-5 border-b bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">Saídas Recentes</h2>
          </div>
          <div className="p-5">
            {recentExits.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                <p>Nenhuma saída hoje.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentExits.map((person) => (
                  <div key={person.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <p className="font-bold text-gray-900 mb-2">{person.name}</p>
                    <div className="text-xs text-gray-500 space-y-1 font-medium">
                      <p className="flex justify-between"><span>Destino:</span> <span className="text-gray-900">Apt {person.apartment}</span></p>
                      <p className="flex justify-between"><span>Entrada:</span> <span>{person.entryTime}</span></p>
                      <p className="flex justify-between text-red-600 mt-1"><span>Saída:</span> <span>{person.exitTime}</span></p>
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
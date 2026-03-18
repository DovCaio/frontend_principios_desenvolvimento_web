"use client";

import { api } from '@/utils/requests/api';
import { LogOut, Search, UserCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Visitor {
  id: number;
  name: string;
  cpf: string;
}

interface ActiveVisitor {
  id: number;
  visitorId: number;
  name: string;
  cpf: string;
  entryTime: string;
}

export default function ControleAcesso() {
  const [searchCpf, setSearchCpf] = useState('');
  const [foundVisitor, setFoundVisitor] = useState<Visitor | null>(null);
  const [activeVisitors, setActiveVisitors] = useState<ActiveVisitor[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchActiveVisitors = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await api.get('/access/active', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setActiveVisitors(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar visitantes ativos.');
    }
  };

  useEffect(() => {
    fetchActiveVisitors();
  }, []);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCpf = searchCpf.replace(/\D/g, '');
    
    if (cleanCpf.length !== 11) {
      toast.error('Digite um CPF válido com 11 dígitos.');
      return;
    }

    setIsSearching(true);
    setFoundVisitor(null);

    try {
      const response = await api.get(`/visitor/${cleanCpf}`);      
        if (response.data) {
        setFoundVisitor(response.data);
        toast.success('Visitante localizado.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Visitante não encontrado no sistema.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleEntry = async () => {
    if (!foundVisitor) return;
    
    setIsSubmitting(true);
    try {
      await api.post('/access/entry', { visitorId: foundVisitor.id });
      toast.success('Entrada autorizada com sucesso!');
      setFoundVisitor(null);
      setSearchCpf('');
      fetchActiveVisitors();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao registrar a entrada.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExit = async (visitorId: number) => {
    try {
      await api.post('/access/exit', { visitorId });
      toast.success('Saída registrada com sucesso!');
      fetchActiveVisitors();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao registrar a saída.');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <UserCheck className="w-8 h-8 text-blue-600" />
          Controle de Acesso
        </h1>
        <p className="text-gray-500 font-medium">
          Busque visitantes cadastrados e gerencie as entradas e saídas do condomínio.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Localizar Visitante</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="CPF do visitante (000.000.000-00)"
                    value={searchCpf}
                    onChange={(e) => setSearchCpf(formatCPF(e.target.value))}
                    maxLength={14}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono bg-gray-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Buscar
                </button>
              </form>
            </div>
          </div>

          {foundVisitor && (
            <div className="bg-white rounded-xl shadow-sm border border-blue-200 overflow-hidden animate-in fade-in slide-in-from-top-4">
              <div className="p-6 bg-blue-50/50">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">Visitante Localizado</p>
                    <h3 className="text-2xl font-black text-gray-900">{foundVisitor.name}</h3>
                    <p className="text-gray-600 font-mono mt-1">CPF: {foundVisitor.cpf}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <button
                  onClick={handleEntry}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Users className="w-6 h-6" />
                  Autorizar Entrada
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Visitantes no Condomínio</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full text-sm">
                {activeVisitors.length} ativos
              </span>
            </div>
            <div className="p-6">
              {activeVisitors.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <UserCheck className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="font-medium text-gray-500 text-lg">Nenhum visitante no momento.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {activeVisitors.map((visitor) => (
                    <div key={visitor.id} className="p-4 border border-gray-200 rounded-xl bg-white flex items-center justify-between gap-4 hover:border-blue-300 transition-colors">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{visitor.name}</p>
                        <p className="text-sm text-gray-500 font-mono mt-0.5">{visitor.cpf}</p>
                        <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-wider">
                          Entrada: {visitor.entryTime || 'Registrado'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleExit(visitor.visitorId)}
                        className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors flex flex-col items-center gap-1 min-w-[80px]"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="text-xs font-bold">Saída</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
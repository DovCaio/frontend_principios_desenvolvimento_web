"use client";

import { api } from '@/utils/requests/api';
import { TrendingUp, UserCheck, Users, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EmployeeDashboard() {
  const [employeeName, setEmployeeName] = useState('...');
  const [activeCount, setActiveCount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedCpf = localStorage.getItem('userCpf');
        
        const [profileRes, activeRes, servicesRes] = await Promise.all([
          storedCpf ? api.get(`/employee/${storedCpf}`).catch(() => null) : null,
          api.get('/access/active').catch(() => ({ data: [] })),
          api.get('/service-request').catch(() => ({ data: [] }))
        ]);

        if (profileRes?.data) setEmployeeName(profileRes.data.name);
        if (activeRes?.data) setActiveCount(activeRes.data.length);
        
        if (servicesRes?.data) {
          const pendentes = servicesRes.data.filter((req: any) => req.status === 'PENDING' || req.status === 'IN_PROGRESS');
          setPendingTasks(pendentes.length);
        }
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Painel de Operação - {employeeName} 🚪
        </h1>
        <p className="text-gray-500 font-medium">
          Controle de acesso e chamados de manutenção
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/employee/acessControl" className="block">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all h-full group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">Controle de Acesso</h2>
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl font-black text-gray-900 mb-1">Registrar Entrada</div>
            <p className="text-sm text-gray-500 font-medium">Visitantes e prestadores</p>
          </div>
        </Link>

        <Link href="/employee/actives" className="block">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all h-full group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-600 group-hover:text-green-600 transition-colors">Painel de Ativos</h2>
              <div className="p-2.5 rounded-lg bg-green-50 text-green-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">
              {isLoading ? '-' : activeCount}
            </div>
            <p className="text-sm text-gray-500 font-medium">Pessoas no condomínio agora</p>
          </div>
        </Link>

        <Link href="/employee/serviceQueue" className="block">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all h-full group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-600 group-hover:text-yellow-600 transition-colors">Fila de Manutenção</h2>
              <div className="p-2.5 rounded-lg bg-yellow-50 text-yellow-600">
                <Wrench className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">
              {isLoading ? '-' : pendingTasks}
            </div>
            <p className="text-sm text-gray-500 font-medium">Chamados pendentes</p>
          </div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col items-center justify-center p-8 text-center min-h-[250px]">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Painel de Operações Atualizado</h2>
          <p className="text-gray-500 font-medium">Use os botões acima para navegar pelas ferramentas do sistema de gestão do condomínio.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col items-center justify-center p-8 text-center min-h-[250px]">
           <TrendingUp className="w-12 h-12 text-blue-200 mb-3" />
           <p className="text-gray-500 font-medium text-sm">Resumo de atividades em tempo real<br/>(Em desenvolvimento)</p>
        </div>
      </div>
    </div>
  );
}
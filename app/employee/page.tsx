"use client";

import { TrendingUp, UserCheck, Users, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function EmployeeDashboard() {
  const user = { name: 'Roberto', role: 'Portaria / Manutenção' };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Painel de Operação - {user.name} 🚪
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
            <div className="text-3xl font-black text-gray-900 mb-1">3</div>
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
            <div className="text-3xl font-black text-gray-900 mb-1">2</div>
            <p className="text-sm text-gray-500 font-medium">Chamados pendentes</p>
          </div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">Estatísticas de Hoje</h2>
          </div>
          <div className="p-6 grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-gray-600 font-medium">Entradas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600 font-medium">Saídas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">10</div>
              <div className="text-sm text-gray-600 font-medium">Visitas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600 font-medium">Serviços</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-800">Atividades Recentes</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { text: 'Chamado #123 concluído', time: '10 min atrás', badge: 'Manutenção', color: 'bg-yellow-100 text-yellow-800' },
              { text: 'Visitante autorizado para Apt 204', time: '1 hora atrás', badge: 'Portaria', color: 'bg-blue-100 text-blue-800' },
              { text: 'Saída registrada Apt 302', time: '2 horas atrás', badge: 'Portaria', color: 'bg-blue-100 text-blue-800' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded ${activity.color}`}>
                  {activity.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
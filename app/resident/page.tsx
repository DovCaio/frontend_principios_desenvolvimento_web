"use client";

import { Calendar, UserCheck, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function ResidentDashboard() {
  const user = { name: 'Cristian', apartment: '101' };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo, {user.name}! 👋
        </h1>
        <p className="text-gray-500 font-medium">
          Apartamento {user.apartment}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/resident/serviceRequest" className="block">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all h-full group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">Meus Chamados</h2>
              <div className="p-2.5 rounded-lg bg-yellow-50 text-yellow-600">
                <Wrench className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">2</div>
            <p className="text-sm text-gray-500 font-medium">1 pendente, 1 em andamento</p>
          </div>
        </Link>

        <Link href="/resident/scheduling" className="block">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all h-full group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">Minhas Reservas</h2>
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">1</div>
            <p className="text-sm text-gray-500 font-medium">Próxima: Churrasqueira 08/03</p>
          </div>
        </Link>

        <Link href="/resident/visitants" className="block">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all h-full group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">Visitantes Cadastrados</h2>
              <div className="p-2.5 rounded-lg bg-green-50 text-green-600">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">2</div>
            <p className="text-sm text-gray-500 font-medium">Pré-autorizados</p>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">Ações Rápidas</h2>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-4">
          <Link href="/resident/serviceRequest" className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
            <Wrench className="w-6 h-6" />
            Abrir Chamado
          </Link>
          <Link href="/resident/scheduling" className="flex flex-col items-center justify-center gap-2 p-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium">
            <Calendar className="w-6 h-6" />
            Fazer Reserva
          </Link>
          <Link href="/resident/visitants" className="flex flex-col items-center justify-center gap-2 p-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:text-green-600 transition-colors font-medium">
            <UserCheck className="w-6 h-6" />
            Cadastrar Visitante
          </Link>
        </div>
      </div>
    </div>
  );
}
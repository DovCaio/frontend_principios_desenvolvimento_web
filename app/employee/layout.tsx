"use client";

import { api } from '@/utils/requests/api';
import { Building, LogOut, ShieldCheck, Users, Wrench } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface EmployeeProfile {
  name: string;
}

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [employee, setEmployee] = useState<EmployeeProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedCpf = localStorage.getItem('userCpf');
        if (storedCpf) {
          const response = await api.get(`/employee/${storedCpf}`);
          setEmployee(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/signin');
  };

  const menuItems = [
    { name: 'Fila de Manutenção', icon: Wrench, href: '/employee/serviceQueue' },
    { name: 'Controle de Acesso', icon: ShieldCheck, href: '/employee/acessControl' },
    { name: 'Painel de Ativos', icon: Users, href: '/employee/actives' },
    { name: 'Residentes dos lotes', icon: House, href: '/employee/lotResidents' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-slate-900 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Building className="w-6 h-6 text-blue-500 mr-2" />
          <span className="font-bold text-lg text-white">CondoSmart <span className="text-xs text-slate-400 font-normal ml-1">PRO</span></span>
        </div>

        <div className="p-4 flex-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">
            Operação
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold border border-slate-700 uppercase">
              {employee?.name ? employee.name.charAt(0) : 'F'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {employee?.name || 'Carregando...'}
              </p>
              <p className="text-xs text-slate-400 truncate">Portaria / Manut.</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Encerrar Turno
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
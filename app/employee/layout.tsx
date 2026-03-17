"use client";

import { LoggedLayout } from '@/features/logged_layout/LoggedLayout';
import { ShieldCheck, Users, Wrench, House } from 'lucide-react';

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const menuItems = [
    { name: 'Fila de Manutenção', icon: Wrench, href: '/employee/serviceQueue' },
    { name: 'Controle de Acesso', icon: ShieldCheck, href: '/employee/acessControl' },
    { name: 'Painel de Ativos', icon: Users, href: '/employee/actives' },
    { name: 'Residentes dos lotes', icon: House, href: '/employee/lotResidents' },
  ];

  return (
    <LoggedLayout menuItems={menuItems} children={children} />
  );
}
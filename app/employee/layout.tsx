"use client";

import { LoggedLayout } from '@/features/logged_layout/LoggedLayout';
import { Building, LogOut, ShieldCheck, Users, Wrench } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Fila de Manutenção', icon: Wrench, href: '/employee/serviceQueue' },
    { name: 'Controle de Acesso', icon: ShieldCheck, href: '/employee/acessControl' },
    { name: 'Painel de Ativos', icon: Users, href: '/employee/actives' },
  ];

  return (
    <LoggedLayout menuItems={menuItems} children={children} />
  );
}
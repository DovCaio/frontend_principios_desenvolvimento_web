"use client";

import { LoggedLayout } from '@/features/logged_layout/LoggedLayout';
import { Calendar, UserPlus, Wrench } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ResidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Meus Chamados', icon: Wrench, href: '/resident/serviceRequest' },
    { name: 'Reservas de Lazer', icon: Calendar, href: '/resident/scheduling' },
    { name: 'Meus Visitantes', icon: UserPlus, href: '/resident/visitants' },
  ];

  return (
    <LoggedLayout menuItems={menuItems} children={children} />
  );
}
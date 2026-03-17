"use client";

import { api } from '@/utils/requests/api';
import { Building, Calendar, LogOut, UserPlus, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface UserProfile {
  name: string;
}
import { LoggedLayout } from '@/features/logged_layout/LoggedLayout';
import { usePathname } from 'next/navigation';

export default function ResidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedCpf = localStorage.getItem('userCpf');
        if (storedCpf) {
          const response = await api.get(`/resident/${storedCpf}`);
          setUser(response.data);
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
    { name: 'Meus Chamados', icon: Wrench, href: '/resident/serviceRequest' },
    { name: 'Reservas de Lazer', icon: Calendar, href: '/resident/scheduling' },
    { name: 'Meus Visitantes', icon: UserPlus, href: '/resident/visitants' },
  ];

  return (
    <LoggedLayout menuItems={menuItems} children={children} />
  );
}
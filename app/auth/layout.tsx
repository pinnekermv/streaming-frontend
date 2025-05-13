'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      router.replace('/');
    }
  }, [router]);

  return <>{children}</>;
}


"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/coming-soon');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

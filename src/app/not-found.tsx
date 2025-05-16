'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page after a short delay
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000); // 3-second delay before redirecting

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Redirecting to the home page...</p>
    </div>
  );
}

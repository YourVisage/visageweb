import { AuthProvider } from './context/authContext';
import { Suspense } from 'react';
import Navbar from '@/component/Navbar';
import { Toaster } from '@/component/ui/toaster';

export default function MyApp({ children }: {
    children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <section>
          <Suspense
            fallback={
              <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between h-[69px]" />
            }
          >
            <Navbar  />
          </Suspense>
        </section>
        <main className="flex flex-1 flex-col items-center py-16">
          {children}
        </main>
        <Toaster />
    </AuthProvider>
  );
}


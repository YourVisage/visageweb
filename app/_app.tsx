// _app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth-context';
import './globals.css';
import Navbar from '@/component/Navbar';
import { Toaster } from '@/component/ui/toaster';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center">
          <Component {...pageProps} />
        </main>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default MyApp;

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px] transition-all duration-300">
        <TopNav />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

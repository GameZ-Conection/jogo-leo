import './globals.css';
import { GameProvider } from '@/src/context/GameContext';

export const metadata = {
  title: 'Tycoon Next',
  description: 'Jogo estilo Tycoon com Next.js e Tailwind',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-900 text-slate-100 min-h-screen"><GameProvider>{children}</GameProvider></body>
    </html>
  );
}

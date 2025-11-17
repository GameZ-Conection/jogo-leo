import './globals.css';
import { GameProvider } from '@/src/context/GameContext';
import { ToastProvider } from '@/src/context/ToastContext';
import OnboardingModal from '@/src/components/OnboardingModal';
import TutorialModal from '@/src/components/TutorialModal';
import { SoundProvider } from '@/src/context/SoundContext';

export const metadata = {
  title: 'Tycoon Next',
  description: 'Jogo estilo Tycoon com Next.js e Tailwind',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-900 text-slate-100 min-h-screen">
        <ToastProvider>
          <SoundProvider>
            <GameProvider>
              {children}
              <OnboardingModal />
              <TutorialModal />
            </GameProvider>
          </SoundProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

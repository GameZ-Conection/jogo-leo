"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: string) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem('sound_enabled');
      return v ? v === '1' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sound_enabled', enabled ? '1' : '0');
    } catch {}
  }, [enabled]);

  const toggle = () => setEnabled((s) => !s);

  const audioMap: Record<string, string> = {
    click: '/sounds/click.mp3',
    place: '/sounds/place.mp3',
    success: '/sounds/success.mp3',
    error: '/sounds/error.mp3',
  };

  const play = (name: string) => {
    if (!enabled) return;
    const src = audioMap[name];
    if (!src) return;
    try {
      const a = new Audio(src);
      a.volume = 0.6;
      a.play().catch(() => {});
    } catch {}
  };

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}

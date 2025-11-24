"use client";
import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;

    // Tentativa de autoplay (só funciona após interação do usuário)
    audio.play().catch(() => {
      console.log("Autoplay bloqueado — aguarde interação do usuário");
    });

    // Cleanup quando sair do tabuleiro
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/sounds/agonizing-progression-sound-effect-209063.mp3"
      style={{ display: "none" }}
    />
  );
}

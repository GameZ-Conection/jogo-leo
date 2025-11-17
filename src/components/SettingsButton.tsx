'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/')}
            title="Configurações"
            aria-label="Abrir configurações"
            className="
        fixed top-4 right-4 z-50
        bg-slate-800 hover:bg-slate-700
        text-slate-200 hover:text-white
        p-3 rounded-full
        shadow-lg shadow-slate-900/40
        transition-transform duration-200 hover:rotate-90
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
        >
            {/* ícone de engrenagem em SVG */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.045 1.724 1.724 0 012.341.39 1.724 1.724 0 001.045 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.045 2.573 1.724 1.724 0 01-.39 2.341 1.724 1.724 0 00-2.573 1.045c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.045 1.724 1.724 0 01-2.341-.39 1.724 1.724 0 00-1.045-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.045-2.573 1.724 1.724 0 01.39-2.341 1.724 1.724 0 002.573-1.045z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        </button>
    );
}

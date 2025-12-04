'use client';
import { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    async function handleRegister() {
        setError("");

        // 🔐 validação antes do Supabase
        if (password !== confirm) {
            setError("As senhas não conferem!");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        alert("Conta criada! Verifique seu e-mail.");
        router.push("/auth/login");
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
            <h1 className="text-3xl mb-4 pixel-font">Criar Conta</h1>

            <div className="flex flex-col gap-3 w-80">
                <input
                    className="p-2 rounded bg-slate-800"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="p-2 rounded bg-slate-800"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className="p-2 rounded bg-slate-800"
                    type="password"
                    placeholder="Confirmar senha"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
                    onClick={handleRegister}
                >
                    Criar Conta
                </button>

                {/* 🔥 Botão de login */}
                <button
                    className="text-slate-300 hover:text-white underline text-sm mt-2"
                    onClick={() => router.push("/auth/login")}
                >
                    Já tenho conta — Fazer login
                </button>
            </div>
        </main>
    );

}

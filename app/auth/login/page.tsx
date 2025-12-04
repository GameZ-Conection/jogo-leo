'use client';
import { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        console.log("Usuário logado:", data.user);
        router.push("/");
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
            <h1 className="text-3xl mb-4 pixel-font">Login</h1>

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

                {error && <p className="text-red-400">{error}</p>}

                <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
                    onClick={handleLogin}
                >
                    Entrar
                </button>

                <button
                    className="text-slate-300 hover:text-white underline text-sm mt-2"
                    onClick={() => router.push("/auth/register")}
                >
                    Não tenho conta — Me Registrar
                </button>
            </div>
        </main>
    );
}

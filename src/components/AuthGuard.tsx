'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function checkUser() {
            const { data } = await supabase.auth.getUser();

            if (!data?.user) {
                router.replace("/auth/register");
                return;
            }

            setAuthenticated(true);
            setLoading(false);
        }

        checkUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Verificando autenticação...
            </div>
        );
    }

    return authenticated ? <>{children}</> : null;
}

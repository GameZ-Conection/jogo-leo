import { supabase } from "@/src/lib/supabase";

export async function saveGameSession({
    player,
    finalScore,
    money,
    board,
    research,
    history,
}: {
    player: any;
    finalScore: number;
    money: number;
    board: any;
    research: any;
    history: any[];
}) {

    // ----------------------------------------------------
    // 1) Identificar o usuário logado
    // ----------------------------------------------------
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    if (!user) {
        throw new Error("Usuário não autenticado, não é possível salvar a sessão.");
    }

    // ----------------------------------------------------
    // 2) Verificar se ESTE usuário já tem um player
    // ----------------------------------------------------
    const { data: existingPlayer } = await supabase
        .from("players")
        .select("*")
        .eq("user_id", user.id)
        .single();

    let playerId = existingPlayer?.id;

    // Se não tiver player, cria um novo
    if (!playerId) {
        const { data: newPlayer, error: playerError } = await supabase
            .from("players")
            .insert({
                user_id: user.id,
                name: player.name,
                surname: player.surname,
                age: player.age,
                description: player.description,
                avatar_url: player.avatar,
            })
            .select()
            .single();

        if (playerError) throw playerError;
        playerId = newPlayer.id;
    }

    // ----------------------------------------------------
    // 3) Criar sessão do jogo
    // ----------------------------------------------------
    const { data: sessionData, error: sessionError } = await supabase
        .from("game_sessions")
        .insert({
            user_id: user.id,
            player_id: playerId,
            final_score: finalScore,
            final_money: money,
        })
        .select()
        .single();

    if (sessionError) throw sessionError;

    const sessionId = sessionData.id;

    // ----------------------------------------------------
    // 4) Salvar research
    // ----------------------------------------------------
    await supabase.from("research_levels").insert({
        session_id: sessionId,
        green: research.green,
        red: research.red,
        blue: research.blue,
    });

    // ----------------------------------------------------
    // 5) Salvar board como JSON
    // ----------------------------------------------------
    await supabase.from("board_cells").insert({
        session_id: sessionId,
        board,
    });

    // ----------------------------------------------------
    // 6) Salvar histórico de eventos
    // ----------------------------------------------------
    if (history.length > 0) {
        const historyRows = history.map((h) => ({
            session_id: sessionId,
            event_id: h.eventId,
            event_title: h.eventTitle,
            choice_text: h.choiceText,
            morale_change: h.moraleChange,
            time_change: h.timeChange,
        }));

        await supabase.from("event_history").insert(historyRows);
    }

    return sessionId;
}

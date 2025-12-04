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

    // 1) cria / garante player
    const { data: playerData, error: playerError } = await supabase
        .from("players")
        .insert({
            name: player.name,
            surname: player.surname,
            age: player.age,
            description: player.description,
            avatar_url: player.avatar,
        })
        .select()
        .single();

    if (playerError) throw playerError;

    // 2) cria session
    const { data: sessionData, error: sessionError } = await supabase
        .from("game_sessions")
        .insert({
            player_id: playerData.id,
            final_score: finalScore,
            final_money: money,
        })
        .select()
        .single();

    if (sessionError) throw sessionError;

    // 3) salva research levels
    await supabase.from("research_levels").insert({
        session_id: sessionData.id,
        green: research.green,
        red: research.red,
        blue: research.blue,
    });

    // 4) salva board.json
    await supabase.from("board_cells").insert({
        session_id: sessionData.id,
        board,
    });

    // 5) salva histórico de eventos
    const historyRows = history.map((h) => ({
        session_id: sessionData.id,
        event_id: h.eventId,
        event_title: h.eventTitle,
        choice_text: h.choiceText,
        morale_change: h.moraleChange,
        time_change: h.timeChange,
    }));

    await supabase.from("event_history").insert(historyRows);

    return sessionData.id;
}

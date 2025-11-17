export function scoreColor(score: number) {
    // 0 = vermelho (#ff3b3b)
    // 100 = verde (#23ff5b)
    const r = Math.floor(255 - (score * 2.55));
    const g = Math.floor(score * 2.55);
    const b = 60;

    return `rgb(${r}, ${g}, ${b})`;
}

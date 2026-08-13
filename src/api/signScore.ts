export interface SignedScore {
    nickname: string;
    score: number;
    timestamp: number;
    signature: string;
}

export async function buildSignedScore(nickname: string, score: number, secret: string): Promise<SignedScore> {
    const timestamp = Date.now();
    const payload = `${nickname}:${score}:${timestamp}`;

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const raw = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(payload)
    );
    const signature = [...new Uint8Array(raw)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    return { nickname, score, timestamp, signature };
}